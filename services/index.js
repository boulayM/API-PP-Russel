const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require ('../models/user');

exports.login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
    }

    // Trouver l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Initialiser la session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    req.session.token = token;
    req.session.loginTime = new Date().toLocaleString();

    
      return res.redirect('home');
    
  } catch (err) {
    console.error('Erreur lors du login:', err);
    // En cas d'erreur inattendue, renvoyer un message générique
    return res.status(500).json({ error: 'Erreur serveur, veuillez réessayer.' });
  }
};