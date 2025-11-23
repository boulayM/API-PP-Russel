// middlewares/validate.js
// Middleware pour valider les données utilisateur avant de les enregistrer dans la base de données
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/;

exports.validateUser = (req, res, next) => {
  const { email, password } = req.body;
  
  // Vérification des champs présents
  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez remplir tous les champs." });
  }

  // Vérification de l'email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email invalide." });
  }

  // Vérification du mot de passe
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Le mot de passe doit comporter 8-32 caractères, une majuscule, un chiffre et un caractère spécial." });
  }

  // Si tout est valide, continuer
  next();
}
