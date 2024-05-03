const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    admin_idAdmin: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
    }
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);