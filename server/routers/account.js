const router = require("express").Router();
const ctrls = require("../controllers/account");

router.post("/login", ctrls.login);

module.exports = router;
