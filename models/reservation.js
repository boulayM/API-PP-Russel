const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema ({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numéro est requis']
    },

    clientName: {
        type: String,
        trim: true,
        required: [true, 'Le nom du client est requis']
    },

    boatName: {
        type: String,
        trim: true,
        required: [true, "Le nom du bateau est requis"],
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

}, {
    //ON AJOUOTE 2 CHAMPS AU DOCUMENT CreatedAt ET updatedAt
    timestamps: true

});


module.exports = mongoose.model('Reservation', Reservation);