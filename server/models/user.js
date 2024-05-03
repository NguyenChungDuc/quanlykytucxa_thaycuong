const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    classStudy: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        filename: String,
        path: {
            type: String,
            default: 'https://th.bing.com/th/id/OIP.0H2FBvCT-goHME7xb5eWEQAAAA?rs=1&pid=ImgDetMain'
        }
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
    }
},
    {
        timestamps: true,
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);