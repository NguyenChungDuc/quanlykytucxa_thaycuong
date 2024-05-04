const Room = require("../models/room");
const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");

const createRoom = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { numberRoom, maxPeople, roomPrice } = req.body;

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  if (!numberRoom) throw new Error("Thiếu số phòng");
  if (!maxPeople) throw new Error("Thiếu số người ở tối đa");
  if (!roomPrice) throw new Error("Thiếu giá phòng");

  if (req.files?.thumb) {
    req.body.thumb = req.files?.thumb[0]?.path;
  }

  if (req.files?.images) {
    req.body.images = req.files?.images?.map((element) => element.path);
  }

  const response = await Room.create(req.body);

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Phòng đã được tạo" : "Đã có lỗi xảy ra",
  });
});

const getOneRoom = asyncHandler(async (req, res) => {
  const { rid } = req.params;

  const room = await Room.findById(rid).populate(
    "currentPeople",
    "name classStudy email"
  );

  return res.status(200).json({
    success: room ? true : false,
    data: room ? room : "Phòng không tồn tại",
  });
});

const getAllRoom = asyncHandler(async (req, res) => {
  const data = await Room.find().populate(
    "currentPeople",
    "name classStudy email"
  );

  return res.status(200).json({
    success: data ? true : false,
    data: data ? data : "Không có phòng nào",
  });
});

const updateRoom = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { rid } = req.params;

  const {
    maxPeople,
    roomPrice,
    devices,
    description,
    currentPeople,
    services,
  } = req.body;

  if (!_id) {
    throw new Error("Thiếu dữ liệu truyền lên");
  }
  const admin = await Admin.findById(_id);
  if (!admin) {
    throw new Error("Không có quyền thực hiện hành động này");
  }

  const data = {};
  if (maxPeople) data.maxPeople = maxPeople;
  if (roomPrice) data.roomPrice = roomPrice;
  if (devices) data.devices = devices;
  if (description) data.description = description;
  if (currentPeople) data.currentPeople = currentPeople;
  if (services) data.services = services;
  if (req.files?.thumb) data.thumb = req.files?.thumb[0]?.path;

  if (req.files?.images) {
    data.images = req.files?.images?.map((element) => element.path);
  }
  const response = await Room.findByIdAndUpdate(rid, data, {
    new: true,
  });

  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Đã cập nhật thông tin" : "Đã có lỗi xảy ra",
  });
});

module.exports = {
  createRoom,
  getOneRoom,
  getAllRoom,
  updateRoom,
};
