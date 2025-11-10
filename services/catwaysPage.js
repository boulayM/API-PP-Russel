exports.get = async (req, res) => {
    res.render('catwaysPage', { user: req.session.user });
}