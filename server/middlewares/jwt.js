const jwt = require('jsonwebtoken')

const generateAccessToken = (uid) =>
    jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: '1d' })

module.exports = {
    generateAccessToken,
}