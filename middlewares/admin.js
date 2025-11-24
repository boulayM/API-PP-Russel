exports.check = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }
    next();
}