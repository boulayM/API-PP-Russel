/**
 * @file services/dataLogin.js
 * @description Service fournissant la date et l'heure actuelle pour l'affichage.
 */

/**
 * @swagger
 * tags:
 *   name: DataLogin
 *   description: Données utilitaires liées à la page de connexion
 */

/**
 * Renvoie la date et l'heure actuelles formatées, puis affiche la page `dataLogin`.
 *
 * ⚠️ Note : Ce service ne suit pas la signature classique Express `(req, res)`,
 * il attend uniquement `res`. Le comportement est conservé volontairement.
 *
 * @function date
 *
 * @swagger
 * /dataLogin:
 *   get:
 *     summary: Renvoie l'heure actuelle et affiche la page dataLogin
 *     tags: [DataLogin]
 *     description: Génère la date/heure courante selon la locale, puis rend la page EJS `dataLogin`.
 *     responses:
 *       200:
 *         description: Page générée avec succès contenant l'heure actuelle.
 */
exports.date = (res) => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    return res.render('dataLogin', { formattedDateTime });
};
