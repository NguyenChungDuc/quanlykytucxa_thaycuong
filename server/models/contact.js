const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    idAdmin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
    },
    status: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Success']
    },
    user_userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    room_roomId: {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
    }
});

//Export the model
module.exports = mongoose.model('Contact', contactSchema);