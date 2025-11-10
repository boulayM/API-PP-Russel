/**
 * Méthode pour afficher la page reservationsPage 
 * 
 * @param {Parameters} req 
 * @param {Parameters} res Retourne la page reservationsPage.ejs
 */

exports.get = async (req, res) => {
    res.render('reservationsPage', { user: req.session.user });
}