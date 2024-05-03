const router = require('express').Router()
const ctrls = require('../controllers/service')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.get('/manage', verifyAccessToken, ctrls.getServices)
router.post('/manage', verifyAccessToken, uploader.single('thumb'), ctrls.createService)

module.exports = router
