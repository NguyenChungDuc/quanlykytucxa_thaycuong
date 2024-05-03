const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    numberRoom: {
        type: Number,
        required: true,
    },
    max_people: {
        type: Number,
        required: true,
    },
    roomprice: {
        type: Number,
        required: true,
    },
    currentPeople: {
        type: Number,
        default: 0
    },
    thumb: {
        filename: String,
        path: {
            type: String,
            default: 'https://alibabahome.vn/wp-content/uploads/2018/12/ky-tuc-xa-nu.jpg'
        }
    },
    images: [
        {
            filename: String,
            path: {
                type: String,
                default: 'https://alibabahome.vn/wp-content/uploads/2018/12/ky-tuc-xa-nu.jpg'
            }
        }
    ],
    description: {
        type: String,
    },
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Room', roomSchema);