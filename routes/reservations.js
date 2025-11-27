/**
 * routes/reservations.js
 *
 * Routes pour les réservations — annotations Swagger minimales.
 */

const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const authPrivate = require('../middlewares/authPrivate');
const sanitizeReservationUpdate = require('../middlewares/sanitizeReservationUpdate');
const skipAuthIfTest = require('../middlewares/skipAuthIfTest');

/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupère la liste des réservations (format dates FR)
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste renvoyée (en test, JSON)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       501:
 *         description: Erreur serveur
 */
router.get('/', skipAuthIfTest(authPrivate.checkJWT), service.getAll);

/**
 * @swagger
 * /reservations/{id}:
 *   post:
 *     summary: Récupère une réservation par catwayNumber (ou identifiant selon implémentation)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ou catwayNumber selon utilisation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation non trouvée
 */
router.post('/:id', skipAuthIfTest(authPrivate.checkJWT), service.getById);

/**
 * @swagger
 * /reservations/add:
 *   put:
 *     summary: Ajoute une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Réservation créée
 *       501:
 *         description: Erreur serveur
 */
router.put('/add', skipAuthIfTest(authPrivate.checkJWT), service.add);

/**
 * @swagger
 * /reservations/{id}:
 *   patch:
 *     summary: Met à jour une réservation (champs autorisés uniquement)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation
 *     requestBody:
 *       description: Champs autorisés pour mise à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationUpdate'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       400:
 *         description: Erreur de validation / aucun champ
 *       404:
 *         description: Réservation non trouvée
 */
router.patch('/:id', skipAuthIfTest(authPrivate.checkJWT), sanitizeReservationUpdate, service.update);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la réservation à supprimer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       501:
 *         description: Erreur serveur
 */
router.delete('/:id', skipAuthIfTest(authPrivate.checkJWT), service.delete);

module.exports = router;
