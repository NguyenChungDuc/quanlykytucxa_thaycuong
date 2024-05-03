const User = require('../models/user')
const Contact = require('../models/contact')
const Room = require('../models/room')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')

const getContacts = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const data = await Contact.find().populate('idAdmin', 'name')
    return res.status(200).json({
        success: data ? true : false,
        data: data ? data : 'Contact not found',
    })
})

const contractApproval = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { cid } = req.params
    const { status, uid, rid } = req.body
    if (!_id || !cid || !status || !uid || !rid) throw new Error('Missing input')
    const isAdmin = await Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const response = await Contact.findByIdAndUpdate({ _id: cid }, { status: status, idAdmin: _id }, { new: true })
    await User.findByIdAndUpdate({ _id: uid }, { roomId: rid }, { new: true })
    await Room.findByIdAndUpdate({ _id: rid }, { $inc: { currentPeople: 1 } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Something went wrong',
    })
})

module.exports = {
    contractApproval,
    getContacts,
}