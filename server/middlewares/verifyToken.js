const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  // Tách bearer và token
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          mes: "Bạn không phải quản lý",
        });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Thiếu token xác thực",
    });
  }
});

module.exports = {
  verifyAccessToken,
};
