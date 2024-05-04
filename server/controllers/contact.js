const Contact = require("../models/contact");
const Room = require("../models/room");
const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");

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

  if (status === "Success" || status === "Cancel") {
    if (status === "Success") {
      const already = await Room.findOne({ currentPeople: uid });
      if (already) throw new Error("Người dùng đã đăng ký phòng rồi");
      const updateRoom = await Room.findByIdAndUpdate(
        rid,
        { $push: { currentPeople: uid } },
        { new: true }
      );
      if (!updateRoom) throw new Error("Thêm sinh viên vào phòng thất bại");
    }

    if (status === "Cancel") {
      const already = await Room.findOne({ currentPeople: uid });
      if (!already) throw new Error("Người dùng chưa đăng ký phòng");
      const updateRoom = await Room.findByIdAndUpdate(
        rid,
        { $pull: { currentPeople: uid } },
        { new: true }
      );
      if (!updateRoom) throw new Error("Xóa người dùng khỏi phòng thất bại");

      const response = await Contact.findByIdAndUpdate(
        cid,
        { status: status, totalPrice, idAdmin: _id },
        { new: true }
      );

      return res.status(200).json({
        success: response ? true : false,
        data: response
          ? "Cập nhật trạng thái hợp đồng thành công"
          : "Đã có lỗi xảy ra",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      mes: "Trạng thái cập nhật không đúng",
    });
  }

  return res.status(500).json({
    success: false,
    mes: "Đã có lỗi xảy ra",
  });
});

module.exports = {
  contractApproval,
  getAllContact,
};
