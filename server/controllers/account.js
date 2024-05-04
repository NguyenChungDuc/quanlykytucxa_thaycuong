const User = require("../models/user");
const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");
const { generateAccessToken } = require("../middlewares/jwt");

const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  let response;
  let isPasswordCorrect = false;

  if (role === "admin") {
    const admin = await Admin.findOne({ email });
    if (admin) {
      isPasswordCorrect = await admin.isCorrectPassword(password);
      response = admin;
    }
  } else {
    const user = await User.findOne({ email });
    if (user) {
      isPasswordCorrect = await user.isCorrectPassword(password);
      response = user;
    }
  }

  if (isPasswordCorrect && response) {
    response = response.toObject();
    delete response.password;

    const accessToken = generateAccessToken(response._id);
    return res.status(200).json({
      success: true,
      response,
      accessToken,
    });
  } else {
    throw new Error("Tài khoản không tồn tại hoặc mật khẩu không đúng");
  }
});

module.exports = {
  login,
};
