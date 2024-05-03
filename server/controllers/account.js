const User = require('../models/user')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')
const { generateAccessToken } = require('../middlewares/jwt')

const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
    if (!email, !password) {
        throw new Error('Missing Inputs')
    }
    if (role === 'admin') {
        const response = await Admin.findOne({ email })
        if (response && await response?.isCorrectPassword(password)) {
            const accessToken = generateAccessToken(response._id)
            return res.status(200).json({
                success: true,
                response,
                accessToken,
            })
        }
        else {
            throw new Error('Invalid credentials')
        }
    }
    else {
        const response = await User.findOne({ email })
        if (response && await response?.isCorrectPassword(password)) {
            const accessToken = generateAccessToken(response._id)
            return res.status(200).json({
                success: true,
                response,
                accessToken
            })
        }
        else {
            throw new Error('Invalid credentials')
        }
    }
})

module.exports = {
    login,
}