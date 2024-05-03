const router = require('express').Router();
const ctrls = require('../controllers/insert');

router.post('/user', ctrls.insertUsers);
router.post('/admin', ctrls.insertAdmins);
router.post('/room', ctrls.insertRooms);
router.post('/service', ctrls.insertServices);
module.exports = router;
