const router = require("express").Router();
const ctrls = require("../controllers/room");
const uploader = require("../config/cloudinary.config");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.get("/", ctrls.getAllRoom);
router.post(
  "/manage",
  verifyAccessToken,
  uploader.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ctrls.createRoom
);
router.get("/one/:rid", ctrls.getOneRoom);
router.put(
  "/manage/:rid",
  verifyAccessToken,
  uploader.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ctrls.updateRoom
);

router.delete("/manage/:rid", verifyAccessToken, ctrls.deleteRoom);

module.exports = router;
