
const User = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const SECRET_KEY = process.env.SECRET_KEY;


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
}


//ON EXPORTE LE CALLBACK AFIN D' ACCEDER A LA PAGE UTILISATEURS

exports.usersPage = (req, res) => {
    
    return res.render('users')
};

//ON EXPORTE LE CALLBACK AFIN DRECCUPERER TOUS LES UTILISATEURS

exports.getAll = async (req, res, next) => {

    try {
        let users = await User.find();

        if (users) {

            return res.render('users', {data: users});
        }

        return res.status(404).json('users_not_found');

    }catch (error) {

        return res.status(501).json('error');
    }
};


//LE CALLBACK QUI SERVIRA A RECCUPERER UN USER


exports.getById = async (req, res, next) => {

    const id = req.body.email

    try {
        let user = await User.findOne({email: id});

        if (user) {
            return res.render ('oneUser', {user});
        }

        return res.status(404).json('user_not_found');
    }
    catch (error) {
        return res.status(501).json(error);
    }
};


//LE CALLBACK QUI SERVIRA A AJOUTER UN USER


 exports.add = async (req, res, next) => {

    const temp = ({
        
        role: req.body.role,
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password

    });

    try {

        let user = await User.create(temp);
        return res.render('usersAdd', {user} );

    } catch (error) {

        return res.status(501).json(error);
    }
};


//LE CALLBACK QUI SERVIRA A MODIFIER UN USER

exports.update = async (req, res, next) => {

    const id = req.params.id;

    const temp = ({
        
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password

    });

    try {
        let user = await User.findById({_id : id});
        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.render('usersUpdate', {user});

        }
        return res.status(404).json("user_not_found");
    }
    catch {
        return res.status(501).json(error);
    }
};

// ICI LE CALLBACK POUR SUPPRIMER UN USER

exports.delete = async (req, res, next) => {

    const id = req.params.id

    try {
        await User.deleteOne ({_id: id});

        return res.render('usersDelete');
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
