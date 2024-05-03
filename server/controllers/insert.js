const User = require("../models/user");
const Admin = require("../models/admin");
const Room = require("../models/room");
const Service = require("../models/service");
const asyncHandler = require("express-async-handler");
const {
  userData,
  adminData,
  roomData,
  serviceData,
} = require("../data/dataTest");

const fnInsertUser = async (user) => {
  await User.create({
    userId: user.userId,
    name: user.name,
    birthday: user.birthday,
    address: user.address,
    classStudy: user.classStudy,
    email: user.email,
    phone: user.phone,
    password: "123456",
  });
};

const insertUsers = asyncHandler(async (req, res) => {
  const promises = [];
  for (let user of userData) {
    promises.push(fnInsertUser(user));
  }
  await Promise.all(promises);
  return res.status(200).json("Done");
});

const fnInsertAdmin = async (admin) => {
  await Admin.create({
    email: admin.email,
    name: admin.name,
    password: "123456",
  });
};

const insertAdmins = asyncHandler(async (req, res) => {
  const promises = [];
  for (let admin of adminData) {
    promises.push(fnInsertAdmin(admin));
  }
  await Promise.all(promises);
  return res.status(200).json("Done");
});

const fnInsertRoom = async (room) => {
  await Room.create({
    numberRoom: room.numberRoom,
    max_people: room.max_people,
    roomprice: room.roomprice,
    description: room.description,
  });
};

const insertRooms = asyncHandler(async (req, res) => {
  const promises = [];
  for (let room of roomData) {
    promises.push(fnInsertRoom(room));
  }
  await Promise.all(promises);
  return res.status(200).json("Done");
});

const fnInsertService = async (service) => {
  await Service.create({
    name: service.name,
    price: service.price,
    description: service.description,
  });
};

const insertServices = asyncHandler(async (req, res) => {
  const promises = [];
  for (let service of serviceData) {
    promises.push(fnInsertService(service));
  }
  await Promise.all(promises);
  return res.status(200).json("Done");
});

module.exports = {
  insertUsers,
  insertAdmins,
  insertRooms,
  insertServices,
};
