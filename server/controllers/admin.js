const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");

const createAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }
  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }
  const { name, email, password } = req.body;
  if (!name) throw new Error("Thiếu tên quản lý");
  if (!email) throw new Error("Thiếu email");
  if (!password) throw new Error("Thiếu mật khẩu");
  const rs = Admin.findOne({ email });
  if (!rs) {
    throw new Error("Tài khoản đã tồn tại");
  }
  const response = await Admin.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Tạo tài khoản thành công" : "Đã có lỗi xảy ra",
  });
});

module.exports = {
  createAdmin,
};
