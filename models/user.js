/*
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//ON IMPORTE LE MODULE BCRYPT QUI PERMET DE HACHER DES EXPRESSIONS

const bcrypt = require ('bcrypt');

const User = new Schema ({

    role: {
        type: String,
        trim: true,
        required: true
    },

    name: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },

    firstname: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        required: [true, "l'e-mail est requis"],
        lowercase: true,
        unique: true //index unique
    },

    password: {
        type: String,
        trim: true
    },

}, {

    //ON AJOUOTE 2 CHAMPS AU DOCUMENT CreatedAt ET updatedAt
    timestamps: true

});

//hash le mot de passe quand il est modifié

User.pre('save', function (next) {
    
    if (!this.isModified('password')) {
        return next ();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User', User);
*/

/**
 * models/user.js
 *
 * Modèle Mongoose pour les utilisateurs + annotations JSDoc et bloc Swagger minimal.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef User
 * @property {string} _id
 * @property {string} name - Nom complet de l'utilisateur
 * @property {string} email - Email (unique)
 * @property {string} password - Mot de passe (haché)
 * @property {string} role - Rôle (ex: "user", "admin")
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant MongoDB
 *         name:
 *           type: string
 *           example: "Jean Dupont"
 *         email:
 *           type: string
 *           format: email
 *           example: "jean.dupont@example.com"
 *         role:
 *           type: string
 *           example: "user"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - email
 *         - password
 */

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
