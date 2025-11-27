// middlewares/authPrivate.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "testsecret";

module.exports.checkJWT = (req, res, next) => {
  let token = (req.session && req.session.token) || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token manquant." });
  }

  try {
    jwt.verify(token, SECRET_KEY);   // <-- nécessaire pour les tests
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide." });
  }
};
