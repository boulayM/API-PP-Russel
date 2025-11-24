
const User = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Middleware to authenticate users
 * 
 * @param {params} request to the server
 * @param {params} response from the server
 * @param {params} next module to be run
 * @returns 
 */
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



/**
 * Méthode pour accéder à la page users
 * 
 * @param {params} req 
 * @param {params} res Renderise la page users.ejs en réponse
 * @returns 
 */

exports.usersPage = (req, res) => {

    
    return res.render('users')
};

/**
 * Méthode pour réccupérer la liste de tous les utilisateurs
 * 
 * @param {params} req Le schéma modèle recherche les utilisateurs
 * @param {params} res Retourne la page des utilisateurs.ejs avec les données de tous les utilisateurs
 * @param {params} next 
 * @returns 
 */

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


/**
 * 
 * @param {params} req Le modèle recherche un utilisateur à paratir de la donnée email
 * @param {params} res Retourne la page oneUser.ejs avec les données de cet utilisateur
 * @param {*} next 
 * @returns 
 */

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


/**
 * 
 * @param {params} req Le modèle demande à la base de données de créer un utilisateur
 * en suivant les données déterminées dans la variable "temp"
 * @param {params} res Retourne la page userAdd.ejs avec les donnés du nouvel utilisateur
 * @param {*} next 
 * @returns 
 */


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


/**
 * 
 * @param {params} req Requete pour modification d'u utilisateur
 * @param {params} res Retourne la page usersUpdate.ejs avec les données mises à jour
 * @param {*} next 
 * @returns 
 */

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

/**
 * 
 * @param {params} req Requete pour supprimer un utilisateur
 * @param {params} res Retourne la page usersDelete.ejs avec un message
 * @param {*} next 
 * @returns 
 */

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
