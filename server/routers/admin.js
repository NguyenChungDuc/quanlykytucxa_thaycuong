const router = require('express').Router()
const ctrls = require('../controllers/admin')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/manage', verifyAccessToken, ctrls.createAdmin)

module.exports = router