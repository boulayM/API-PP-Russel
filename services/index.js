/**
 * @file services/index.js
 * @description Service d'authentification (login utilisateur).
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * Authentifie un utilisateur à partir d'un email et d'un mot de passe.
 * - Vérifie la présence des champs requis
 * - Vérifie l'existence de l'utilisateur
 * - Vérifie le mot de passe avec bcrypt
 * - Génère un token JWT
 * - Initialise la session utilisateur
 * - Redirige vers `/home`
 *
 * @async
 * @function login
 *
 * @param {Object} req - Objet requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {string} req.body.email - Email de l'utilisateur
 * @param {string} req.body.password - Mot de passe en clair
 * @param {Object} res - Objet réponse Express
 *
 * @returns {Promise<void>}
 *
 * @swagger
 * /:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Authentification via email et mot de passe. Initialise la session et redirige vers `/home`.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *                 description: Mot de passe en clair
 *     responses:
 *       200:
 *         description: Redirection vers `/home` (connexion réussie)
 *       400:
 *         description: Email ou mot de passe manquant
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
    }

    // Trouver l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Initialiser la session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    req.session.token = token;
    req.session.loginTime = new Date().toLocaleString();

    return res.redirect('home');

  } catch (err) {
    console.error('Erreur lors du login:', err);
    return res.status(500).json({ error: 'Erreur serveur, veuillez réessayer.' });
  }
};
