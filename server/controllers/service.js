const Service = require('../models/service')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')

const getServices = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const response = await Service.find()
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Something went wrong'
    })
})

const createService = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { name, price, description } = req.body
    if (!_id) {
        throw new Error('Missing input')
    }
    const isAdmin = Admin.findById(_id)
    if (!isAdmin) {
        throw new Error('Not authorized to perform this action')
    }
    const data = {}
    if (!name) {
        throw new Error('Missing name service')
    }
    else {
        data.name = name
    }
    if (!price) {
        throw new Error('Missing price service')
    }
    else {
        data.price = price
    }
    if (description) data.description = description
    if (req.file) {
        data.thumb = {
            filename: req.file.filename,
            path: req.file.path
        }
    }
    const response = Service.create(data)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created' : 'Something went wrong'
    })
})

module.exports = {
    getServices,
    createService,
}