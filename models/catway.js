const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema ({
    
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numéro est requis']
    },

    catwayType: {
        type: String,
        trim: true,
        required: [true, 'Le type est requis']
    },

    catwayState: {
        type: String,
        trim: true,
        required: [true, "L'état est requis"],
    },

}, {
    //ON AJOUOTE 2 CHAMPS AU DOCUMENT CreatedAt ET updatedAt
    timestamps: true

});


module.exports = mongoose.model('Catway', Catway);