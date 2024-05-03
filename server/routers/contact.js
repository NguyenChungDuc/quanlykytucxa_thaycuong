const router = require("express").Router();
const ctrls = require("../controllers/contact");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/", verifyAccessToken, ctrls.getContacts);
router.put("/manage/:cid", verifyAccessToken, ctrls.contractApproval);

module.exports = router;
