const Room = require("../models/room");
const User = require("../models/user");
const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");
const RoomService = require("../models/roomService");

const createRoom = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { numberRoom, max_people, roomprice } = req.body;
  if (!_id) {
    throw new Error("Missing input");
  }
  const isAdmin = await Admin.findById(_id);
  if (!isAdmin) {
    throw new Error("Not authorized to perform this action");
  }
  if (!numberRoom) throw new Error("Missing number room");
  if (!max_people) throw new Error("Missing max people");
  if (!roomprice) throw new Error("Missing price");
  if (req.files?.thumb) {
    req.body.thumb = {
      filename: req.files?.thumb[0]?.filename,
      path: req.files?.thumb[0]?.path,
    };
  }
  if (req.files?.images) {
    req.body.images = req.files?.images?.map((element) => {
      return {
        filename: element.filename,
        path: element.path,
      };
    });
  }
  const response = await Room.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Created room" : "Somethings went wrong",
  });
});

const getOneRoom = asyncHandler(async (req, res) => {
  const { rid } = req.params;
  const room = await Room.findById(rid);
  const peopleInRoom = await User.find({ roomId: rid }).select(
    "name email phone"
  );
  const roomServices = await RoomService.find({ room_idRoom: rid })
    .select("service_idService")
    .populate("service_idService", "name price description thumb");

  return res.status(200).json({
    success: room ? true : false,
    data: room ? room : "Room not found",
    peopleInRoom,
    roomServices,
  });
});

const getRooms = asyncHandler(async (req, res) => {
  const data = await Room.find();
  return res.status(200).json({
    success: data ? true : false,
    data: data ? data : "Room not found",
  });
});

module.exports = {
  createRoom,
  getOneRoom,
  getRooms,
};
