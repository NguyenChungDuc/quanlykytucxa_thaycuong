const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomServiceSchema = new mongoose.Schema({
    room_idRoom: {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
    },
    service_idService: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
    },
});

//Export the model
module.exports = mongoose.model('RoomService', roomServiceSchema);