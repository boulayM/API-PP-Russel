/**
 * @file services/catways.js
 * @description Service contenant toutes les opérations CRUD liées aux catways.
 */

const Catway = require('../models/catway');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des pontons (catways)
 */

/**
 * GET ALL CATWAYS
 * 
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste complète des catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *       404:
 *         description: Aucun catway trouvé
 *       501:
 *         description: Erreur interne
 */
exports.getAll = async (req, res, next) => {
    try {
        let catways = await Catway.find();
        catways.sort((a, b) => a.catwayNumber - b.catwayNumber);

        // 🎯 Mode test : renvoie JSON
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ data: catways });
        }

        return res.render('catways', { data: catways, user: req.session?.user });

    } catch (error) {
        return res.status(501).json('error');
    }
};

/**
 * GET CATWAY BY ID
 * 
 * @swagger
 * /catways/{id}:
 *   post:
 *     summary: Récupère un catway via son numéro
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Aucun catway ne correspond
 *       501:
 *         description: Erreur interne
 */
exports.getById = async (req, res, next) => {
    const id = req.body.catwayNumber;
    try {
        let oneCatway = await Catway.findOne({ catwayNumber: id });

        if (!oneCatway) {
            return res.status(404).json('catway_not_found');
        }

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway: oneCatway });
        }

        return res.render('oneCatway', { oneCatway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * ADD CATWAY
 * 
 * @swagger
 * /catways/add:
 *   put:
 *     summary: Ajoute un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               catwayType:
 *                 type: string
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway créé avec succès
 *       501:
 *         description: Erreur interne
 */
exports.add = async (req, res, next) => {
    const temp = {
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    };

    try {
        let catway = await Catway.create(temp);

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway });
        }

        return res.render('catwaysAdd', { catway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * UPDATE CATWAY
 * 
 * @swagger
 * /catways/{id}:
 *   patch:
 *     summary: Met à jour un catway existant
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant MongoDB du catway
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway non trouvé
 *       501:
 *         description: Erreur interne
 */
exports.update = async (req, res, next) => {
    const id = req.params.id;

    const temp = {
        catwayState: req.body.catwayState
    };

    try {
        let catway = await Catway.findOne({ _id: id });

        if (!catway) {
            return res.status(404).json("catway_not_found");
        }

        Object.keys(temp).forEach(key => {
            if (temp[key]) catway[key] = temp[key];
        });

        await catway.save();

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway });
        }

        return res.render('catwaysUpdate', { catway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

/**
 * DELETE CATWAY
 * 
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       501:
 *         description: Erreur interne
 */
exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Catway.deleteOne({ _id: id });

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ deleted: true });
        }

        return res.render('catwayDelete');

    } catch (error) {
        return res.status(501).json(error);
    }
};
