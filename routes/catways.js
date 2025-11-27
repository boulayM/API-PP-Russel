/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways (places d'amarrage)
 */

var express = require('express');
var router = express.Router();

const service = require('../services/catways');
const authPrivate = require('../middlewares/authPrivate');
const admin = require('../middlewares/adminConfirm');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste de tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retourne la liste des catways
 *       401:
 *         description: Non authentifié
 */
router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.getAll);

/**
 * @swagger
 * /catways/{id}:
 *   post:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant du catway (catwayNumber)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway introuvable
 */
router.post('/:id', skipAuthIfTest(authPrivate.checkJWT), service.getById);

/**
 * @swagger
 * /catways/add:
 *   put:
 *     summary: Ajoute un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway ajouté
 *       400:
 *         description: Requête invalide
 */
router.put('/add', skipAuthIfTest(authPrivate.checkJWT), admin, service.add);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Modifie un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway introuvable
 */
router.patch('/:id', skipAuthIfTest(authPrivate.checkJWT), admin, service.update);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway introuvable
 */
router.delete('/:id', skipAuthIfTest(authPrivate.checkJWT), admin, service.delete);

module.exports = router;
