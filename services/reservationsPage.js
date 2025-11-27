/**
 * @swagger
 * tags:
 *   name: ReservationsPage
 *   description: Pages HTML d'affichage liées aux réservations
 */

/**
 * GET /reservationsPage
 * @summary Affiche la page HTML des réservations
 * @tags ReservationsPage
 * @description
 * Cette route sert uniquement une **page EJS réservée à l'interface utilisateur**.
 * Elle ne renvoie aucun JSON.  
 * Elle injecte également l’utilisateur authentifié dans la vue.
 *
 * @return {string} 200 - Page HTML générée
 */
exports.get = async (req, res) => {
    res.render('reservationsPage', { user: req.session.user });
};
