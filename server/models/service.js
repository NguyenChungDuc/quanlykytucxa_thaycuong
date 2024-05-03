const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumb: {
        fileName: String,
        path: {
            type: String,
            default: 'https://xaydungvincon.com/Content/Images/FileUpload/2020/9/mau-nha-ve-sinh-dep-sang-trong0.jpg'
        }
    },
});

//Export the model
module.exports = mongoose.model('Service', serviceSchema);