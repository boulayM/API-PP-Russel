const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users/authenticate:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags: [Users]
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
 *                 example: admin@mail.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       403:
 *         description: Identifiants incorrects
 *       404:
 *         description: Utilisateur non trouvé
 *       501:
 *         description: Erreur serveur
 */
exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }, '-__v -createdAt -updatedAt');

        if (!user) {
            return res.status(404).json('user_not_found');
        }

        bcrypt.compare(password, user.password, function (err, response) {
            if (err) {
                throw new Error(err);
            }

            if (response) {
                delete user._doc.password;

                const expireIn = 24 * 60 * 60;
                const token = jwt.sign(
                    { user },
                    SECRET_KEY,
                    { expiresIn: expireIn }
                );

                res.header('Authorization', 'Bearer ' + token);

                return res.status(200).json('authenticate_succeed');
            }

            return res.status(403).json('wrong_credentials');
        });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * @swagger
 * /users/page:
 *   get:
 *     summary: Affiche la page principale des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Page users rendue
 */
exports.usersPage = (req, res) => {
    return res.render('users');
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       404:
 *         description: Aucun utilisateur trouvé
 *       501:
 *         description: Erreur serveur
 */
exports.getAll = async (req, res, next) => {
    try {
        let users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json('users_not_found');
        }

        return res.render('users', { data: users });

    } catch (error) {
        return res.status(501).json('error');
    }
};

/**
 * @swagger
 * /users/{email}:
 *   post:
 *     summary: Récupère un utilisateur via son email
 *     tags: [Users]
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: client@mail.com
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 *       501:
 *         description: Erreur serveur
 */
exports.getById = async (req, res, next) => {

    const id = req.body.email;

    try {
        let user = await User.findOne({ email: id });

        if (user) {
            return res.render('oneUser', { user });
        }

        return res.status(404).json('user_not_found');

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * @swagger
 * /users/add:
 *   put:
 *     summary: Ajoute un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - name
 *               - firstname
 *               - email
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *               name:
 *                 type: string
 *                 example: Doe
 *               firstname:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Utilisateur créé
 *       501:
 *         description: Erreur serveur
 */
exports.add = async (req, res, next) => {

    const temp = {
        role: req.body.role,
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await User.create(temp);
        return res.render('usersAdd', { user });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Met à jour un utilisateur existant
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur introuvable
 *       501:
 *         description: Erreur serveur
 */
exports.update = async (req, res, next) => {

    const id = req.params.id;

    const temp = {
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await User.findById({ _id: id });

        if (!user) {
            return res.status(404).json("user_not_found");
        }

        Object.keys(temp).forEach((key) => {
            if (!!temp[key]) {
                user[key] = temp[key];
            }
        });

        await user.save();

        return res.render('usersUpdate', { user });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       501:
 *         description: Erreur serveur
 */
exports.delete = async (req, res, next) => {

    const id = req.params.id;

    try {
        await User.deleteOne({ _id: id });
        return res.render('usersDelete');

    } catch (error) {
        return res.status(501).json(error);
    }
};
