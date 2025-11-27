/**
 * @file users.js
 * @description Routes dédiées à la gestion des utilisateurs.
 */

var express = require('express');
var router = express.Router();

const service = require('../services/users');
const authPrivate = require('../middlewares/authPrivate');
const validate = require('../middlewares/usersValidation');
const confirm = require('../middlewares/confirmDeleteUser');
const adminConfirm = require('../middlewares/adminConfirm');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints de gestion des utilisateurs (Admin)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste renvoyée (JSON en test, HTML sinon)
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Accès refusé (admin requis)
 */
router.get(
  '/',
  skipAuthIfTest(authPrivate.checkJWT),
  adminConfirm,
  service.getAll
);

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant MongoDB de l’utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 *       403:
 *         description: Accès refusé (admin requis)
 */
router.post(
  '/:id',
  skipAuthIfTest(authPrivate.checkJWT),
  adminConfirm,
  service.getById
);

/**
 * @swagger
 * /users/add:
 *   put:
 *     summary: Ajoute un nouvel utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserCreate"
 *     responses:
 *       200:
 *         description: Utilisateur ajouté
 *       400:
 *         description: Erreur de validation
 *       403:
 *         description: Accès refusé (admin requis)
 */
router.put(
  '/add',
  skipAuthIfTest(authPrivate.checkJWT),
  adminConfirm,
  validate,
  service.add
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modifie un utilisateur existant
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant MongoDB de l’utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 *       403:
 *         description: Accès refusé (admin requis)
 */
router.patch(
  '/:id',
  skipAuthIfTest(authPrivate.checkJWT),
  adminConfirm,
  service.update
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur introuvable
 *       403:
 *         description: Accès refusé (admin requis)
 */
router.delete(
  '/:id',
  skipAuthIfTest(authPrivate.checkJWT),
  adminConfirm,
  service.delete,
  confirm
);

/**
 * @swagger
 * /users/authenticate:
 *   post:
 *     summary: Authentifie un utilisateur et renvoie un JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserLogin"
 *     responses:
 *       200:
 *         description: Connexion réussie, JWT renvoyé
 *       401:
 *         description: Identifiants invalides
 */
router.post('/authenticate', service.authenticate);

module.exports = router;
