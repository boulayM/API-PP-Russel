exports.get = async (req, res) => {

    if (!req.session.user) {
    return res.redirect('/index'); // Redirect if not logged in
  }
  res.render('home', { user: req.session.user });
}