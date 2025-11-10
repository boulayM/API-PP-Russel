exports.confirmDelete = async (req, res, next) => {
  const { confirm } = req.query; // Expecting a query parameter like ?confirm=true
  if (confirm === 'true') {
    next(); // Proceed to the delete handler
  } else {
    res.render('users');
  }
}
