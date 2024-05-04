const User = require("../models/user");
const Admin = require("../models/admin");
const Room = require("../models/room");
const Contact = require("../models/contact");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  const room = await Room.findOne({ currentPeople: _id }).select(
    "numberRoom roomPrice"
  );

  const contact = await Contact.findOne({
    userId: _id,
    name: "Register",
  }).select("name status");

  return res.status(200).json({
    success: user ? true : false,
    user: user ? user : "Tài khoản không tồn tại",
    room: room ? room : "Chưa có phòng nào được đăng kí",
    contact: contact ? contact : "Không có hợp đồng nào",
  });
});

const updateCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, birthday, address, classStudy, email, phone, password } =
    req.body;

  if (_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(200).json({
      success: true,
      mes: "Không có gì thay đổi",
    });
  }

  const data = {};
  if (name) data.name = name;
  if (birthday) data.birthday = birthday;
  if (address) data.address = address;
  if (classStudy) data.classStudy = classStudy;
  if (email) data.email = email;
  if (phone) data.phone = phone;
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    data.password = await bcrypt.hash(password, salt);
  }
  if (req.file) {
    data.avatar = req.file.path;
  }
  const response = await User.findByIdAndUpdate(_id, data, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Cập nhật thông tin thành công" : "Đã có lỗi xảy ra",
  });
});

const registerForRoom = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const { rid } = req.params;
  if (!_id || !rid || !name) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  if (name !== "Register")
    throw new Error("Tên hợp đồng truyền lên không đúng");

  const user = await User.findById(_id);
  if (!user) throw new Error("Tài khoản không tồn tại");

  const contact = await Contact.findOne({ userId: _id });
  if (contact?.name === "Register" && contact?.status === "Processing")
    throw new Error("Đã có phòng được đăng ký trước đó và đang chờ xét duyệt");

  const already = await Room.findOne({ currentPeople: _id });
  if (already) throw new Error("Tài khoản đã đăng ký phòng trước đó rồi");

  const room = await Room.findById(rid);
  if (!room) throw new Error(`Không tồn tại phòng có id=${rid}`);

  if (room?.currentPeople?.length >= room?.maxPeople)
    throw new Error("Phòng đã đầy, không thể đăng ký thêm");

  const response = await Contact.create({
    name,
    userId: _id,
    roomId: rid,
  });

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Đăng ký phòng thành công" : "Đã có lỗi xảy ra",
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { userId, name, brithday, classStudy, email, password } = req.body;

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Bạn không có quyền thực hiện hành động này");
  }

  if (!userId) throw new Error("Thiếu mã số sinh viên");
  if (!name) throw new Error("Thiếu tên sinh viên");
  if (!brithday) throw new Error("Thiếu ngày sinh");
  if (!classStudy) throw new Error("Thiếu lớp");
  if (!email) throw new Error("Thiếu email");
  if (!password) throw new Error("Thiếu mật khẩu");

  const rs = User.findOne({ userId });
  if (!rs) {
    throw new Error("Đã tồn tại sinh viên có mã số này");
  }
  const response = await User.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Tạo mới thành công" : "Đã có lỗi xảy ra",
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { uid } = req.params;

  if (!_id || !uid) {
    throw new Error("Thiếu thông tin truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const response = await User.findByIdAndDelete(uid);

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Đã xóa" : "Đã có lỗi xảy ra",
  });
});

const getOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { uid } = req.params;

  if (_id || !uid) throw new Error("Thiếu thông tin truyền lên");

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const response = await User.findById(uid);

  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "Tài khoản không tồn tại",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw new Error("Cần quyền truy cập");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const response = await User.find().select("-password");

  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "Tài khoản không tồn tại",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { uid } = req.params;

  if (!_id || !uid) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const { password } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Cập nhật thành công" : "Đã có lỗi xảy ra",
  });
});

module.exports = {
  getCurrent,
  updateCurrent,
  createUser,
  getOneUser,
  deleteUser,
  getUsers,
  updateUserByAdmin,
  registerForRoom,
};
