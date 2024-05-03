const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    blog_blogId: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    },
    user_userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    like_or_dislike: {
        type: String,
        default: 'No Selected',
        enum: ['Like', 'Dislike', 'No Selected']
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);