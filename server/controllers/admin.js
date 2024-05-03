const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')

const createAdmin = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const { name, email, password } = req.body
    if (!name) throw new Error('Missing name')
    if (!email) throw new Error('Missing email')
    if (!password) throw new Error('Missing password')
    const rs = Admin.findOne({ email })
    if (!rs) {
        throw new Error("Email already exists")
    }
    const response = await Admin.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created admin' : 'Somethings went wrong'
    })
})

module.exports = {
    createAdmin,
}
