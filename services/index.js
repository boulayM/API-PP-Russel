const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require ('../models/user');

// ICI LA METHODE D'AUTENTIFICATION 

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
         let user = await User.findOne ({ email: email }, '-__v -createdAt -updatedAt');

         if (user) {

            bcrypt.compare(password, user.password, function(err, response) {

                if (err) {
                throw new Error(err);
            }
            
            if (response) {

                delete user._doc.password;

                const expireIn = 24 * 60 * 60;
                const token = jwt.sign ({
                    user: user
                },
                SECRET_KEY,
                {
                    expiresIn: expireIn
                
                });

                res.header ('Authorization', 'Bearer' + token);

                return res.status(200).json('authenticate_succeed');
            }

            return res.status(403).json ('wrong_credentials');
            });

         } else {

            return res.status(404).json('user_not_found');
         }
         
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.loggin = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        req.session.user={email}
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.render('home', {user});
      } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
      }
    };
