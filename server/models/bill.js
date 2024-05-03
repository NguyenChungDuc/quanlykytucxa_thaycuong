const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var billSchema = new mongoose.Schema({
    contact_contactId: {
        type: mongoose.Types.ObjectId,
        ref: 'Contact',
    },
    type: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Success']
    },
    description: {
        type: String
    }
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Bill', billSchema);