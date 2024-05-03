const User = require('../models/user')
const Admin = require('../models/admin')
const Room = require('../models/room')
const Contact = require('../models/contact')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).populate('roomId', 'numberRoom')
    return res.status(200).json({
        success: user ? true : false,
        user: user ? user : 'User not found',
    })
})

const updateCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { name, birthday, address, classStudy, email, phone, password } = req.body
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error('Nothing changes')
    }
    const data = {}
    if (name) data.name = name
    if (birthday) data.birthday = birthday
    if (address) data.address = address
    if (classStudy) data.classStudy = classStudy
    if (email) data.email = email
    if (phone) data.phone = phone
    if (password) {
        const salt = bcrypt.genSaltSync(10)
        data.password = await bcrypt.hash(password, salt)
    }
    if (req.file) {
        data.avatar = {
            filename: req.file.filename,
            path: req.file.path
        }
    }
    const response = await User.findByIdAndUpdate(_id, data, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const registerForRoom = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { type } = req.body
    const { rid } = req.params
    if (!_id || !rid || !type) {
        throw new Error('Missing input')
    }
    const isUser = await User.findById(_id)
    if (isUser && isUser.roomId) {
        throw new Error('The user has registered for the room')
    }
    const isRoom = await Room.findOne({ '_id': rid })
    if (!isRoom) {
        throw new Error(`No such room with id=${rid}`)
    }
    const response = await Contact.create({
        type: type,
        user_userId: _id,
        room_roomId: rid,
    })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const createUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { userId, name, brithday, address, classStudy, email, password } = req.body
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    if (!userId) throw new Error('Missing user id')
    if (!name) throw new Error('Missing name')
    if (!brithday) throw new Error('Missing birthday')
    if (!address) throw new Error('Missing address')
    if (!classStudy) throw new Error('Missing class')
    if (!email) throw new Error('Missing email')
    if (!password) throw new Error('Missing password')
    const rs = User.findOne({ userId })
    if (!rs) {
        throw new Error("UserId already exists")
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created user' : 'Somethings went wrong'
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { uid } = req.params
    if (!_id || !uid) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted` : 'No user delete'
    })
})

const getOneUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { uid } = req.params
    if (!uid) throw new Error('Missing id user')
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const response = await User.findOne({ _id: uid })
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'User not found'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const response = await User.find().select('-refreshToken -password')
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'User not found'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { uid } = req.params
    if (!_id || !uid) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const { password } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync(10)
        req.body.password = await bcrypt.hash(password, salt)
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-refreshToken -password')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

module.exports = {
    getCurrent,
    updateCurrent,
    createUser,
    getOneUser,
    deleteUser,
    getUsers,
    updateUserByAdmin,
    registerForRoom,
}