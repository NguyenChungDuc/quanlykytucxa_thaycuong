const Service = require('../models/service');
const Room = require('../models/room');
const RoomService = require('../models/roomService');
const Admin = require('../models/admin');
const asyncHandler = require('express-async-handler');

const getRoomServices = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw new Error('Missing input');
  }
  const isAdmin = Admin.findById(_id);
  if (!isAdmin) {
    throw new Error('Not authorized to perform this action');
  }
  const response = await RoomService.find();
  return res.status(200).json({
    success: response ? true : false,
    data: response ? response : 'Something went wrong',
  });
});

const createRoomService = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { rid, sid } = req.body;
  if (!_id) {
    throw new Error('Missing input');
  }
  const isAdmin = Admin.findById(_id);
  if (!isAdmin) {
    throw new Error('Not authorized to perform this action');
  }
  if (!rid) throw new Error('Missing room id'); // quên check xem room có tồn tại không
  if (!sid) throw new Error('Missing service id');

  const isRoom = Room.findOne({ _id: rid });
  if (!isRoom) throw new Error('Room not found');

  const isService = Service.findOne({ _id: sid });
  if (!isService) throw new Error('Service not found');

  const response = RoomService.create({
    room_idRoom: rid,
    service_idService: sid,
  });
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'Created' : 'Something went wrong',
  });
});

module.exports = {
  getRoomServices,
  createRoomService,
};
