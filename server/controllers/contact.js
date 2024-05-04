const { Types } = require("mongoose");
const Contact = require("../models/contact");
const Room = require("../models/room");
const Admin = require("../models/admin");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getContact = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cid } = req.params;

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const contact = await Contact.findById(cid)
    .populate({
      path: "idAdmin",
      select: "name",
    })
    .populate({
      path: "userId",
      select: "name email phone address classStudy",
    })
    .populate({
      path: "roomId",
      select: "numberRoom maxPeople roomPrice",
    });

  return res.status(200).json({
    success: contact ? true : false,
    data: contact ? contact : "Hợp đồng không tồn tại",
  });
});

const getAllContact = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const data = await Contact.find()
    .populate({
      path: "idAdmin",
      select: "name",
    })
    .populate({
      path: "userId",
      select: "name email phone address classStudy",
    })
    .populate({
      path: "roomId",
      select: "numberRoom maxPeople roomPrice",
    });

  return res.status(200).json({
    success: data ? true : false,
    data: data ? data : "Không có hợp đồng nào",
  });
});

const contractApproval = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cid } = req.params;
  const { status, uid, rid, totalPrice } = req.body;

  if (!_id || !cid || !status || !uid || !rid)
    throw new Error("Thiếu dữ liệu truyền lên");

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const contact = await Contact.findById(cid);
  if (!contact) {
    throw new Error("Hợp đồng không tồn tại");
  }

  const user = await User.findById(uid);
  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  const room = await Room.findById(rid);
  if (!room) {
    throw new Error("Phòng không tồn tại");
  }

  if (room?.currentPeople?.length >= room?.maxPeople) {
    throw new Error("Phòng đã đầy, không thể đăng ký thêm");
  }

  if (status === "Success") {
    const already = await Room.findOne({ currentPeople: uid });
    if (already) throw new Error("Người dùng đã đăng ký phòng rồi");
    const updateRoom = await Room.findByIdAndUpdate(
      rid,
      { $push: { currentPeople: uid } },
      { new: true }
    );
    if (!updateRoom) throw new Error("Thêm sinh viên vào phòng thất bại");

    const response = await Contact.findByIdAndUpdate(
      cid,
      { status: status, totalPrice, idAdmin: _id },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      mes: response
        ? "Cập nhật trạng thái hợp đồng thành công"
        : "Đã có lỗi xảy ra",
    });
  } else {
    return res.status(400).json({
      success: false,
      mes: "Trạng thái cập nhật không đúng",
    });
  }
});

const deleteContactByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cid } = req.params;
  const { uid, rid } = req.body;

  if ((!_id, !uid, !rid)) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const already = await Room.findOne({ currentPeople: uid });
  if (!already) throw new Error("Người dùng chưa đăng ký phòng");
  const updateRoom = await Room.findByIdAndUpdate(
    rid,
    { $pull: { currentPeople: uid } },
    { new: true }
  );
  if (!updateRoom) throw new Error("Xóa người dùng khỏi phòng thất bại");

  const response = await Contact.findByIdAndDelete(cid);

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Xóa hợp đồng thành công" : "Đã có lỗi xảy ra",
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cid } = req.params;
  const isCheck = new Types.ObjectId(_id);

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const user = await User.findById(_id);
  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  const contact = await Contact.findById(cid);
  if (!contact) {
    throw new Error("Hợp đồng không tồn tại");
  }

  if (
    contact?.name === "Register" &&
    contact?.status === "Processing" &&
    contact?.userId.equals(isCheck)
  ) {
    const response = await Contact.findByIdAndDelete(cid);
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Xóa hợp đồng thành công" : "Đã có lỗi xảy ra",
    });
  } else {
    return res.status(400).json({
      success: false,
      mes: "Xóa hợp đồng thất bại",
    });
  }
});

module.exports = {
  contractApproval,
  getAllContact,
  getContact,
  deleteContactByAdmin,
  deleteContact,
};
