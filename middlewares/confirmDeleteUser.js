// middlewares/confirmDeleteUser.js
module.exports = function confirm(req, res, next) {
  if (!req.body.confirm || req.body.confirm !== "yes") {
    return res.status(400).json({ message: "Confirmation requise pour supprimer l'utilisateur." });
  }
  next();
};
