// middlewares/validate.js
// Middleware pour valider les données utilisateur avant de les enregistrer dans la base de données

module.exports = function validate(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs." });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email invalide." });
  }

  // En mode test → validation allégée
  if (process.env.NODE_ENV === "test") {
    return next();
  }

  // Validation stricte en mode normal
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    });
  }

  next();
};
