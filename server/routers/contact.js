const router = require("express").Router();
const ctrls = require("../controllers/contact");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/manage", verifyAccessToken, ctrls.getAllContact);
router.put("/manage/:cid", verifyAccessToken, ctrls.contractApproval);
router.delete("/manage/:cid", verifyAccessToken, ctrls.deleteContactByAdmin);
router.get("/manage/one/:cid", verifyAccessToken, ctrls.getContact);
router.delete("/:cid", verifyAccessToken, ctrls.deleteContact);

module.exports = router;
