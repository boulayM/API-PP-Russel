
const User = require ('../models/user');

//ON EXPORTE LE CALLBACK AFIN D' ACCEDER A LA PAGE UTILISATEURS

exports.usersPage = (req, res) => {
    
    return res.render('users')
};


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

    const id = req.params.id

    try {
        let user = await User.findOne(id);

        if (user) {
            return res.status(200).json(user);
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
        return res.status(201).json(user);
    }
    catch (error) {

        return res.status(501).json(error);
    }
};


//LE CALLBACK QUI SERVIRA A MODIFIER UN USER

exports.update = async (req, res, next) => {

    const id = req.params.id

    const temp = ({

        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email
    });

    try {
        let user = await User.findOne({_id : id});
        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(201).json(user);

        }
        return res.status(404).json("user_not_found");
    }
    catch {
        return res.status(501).json(error);
    }
}

// ICI LE CALLBACK POUR SUPPRIMER UN USER

exports.delete = async (req, res, next) => {

    const id = req.params.id

    try {
        await User.deleteOne ({_id: id});

        return res.status(204).json("delete_ok");
    }
    catch (error) {
        return res.status(501).json(error);
    }
}
