const router = require("express").Router();
const ctrls = require("../controllers/roomService");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/manage", verifyAccessToken, ctrls.getRoomServices);
router.post("/manage", verifyAccessToken, ctrls.createRoomService);

module.exports = router;
