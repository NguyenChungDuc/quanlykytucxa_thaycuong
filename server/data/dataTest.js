const userData = [
  {
    userId: "1",
    name: "User 1",
    birthday: "14/8/2000",
    address: "Da Nang",
    classStudy: "20CT1",
    email: "user1@example.com",
    phone: "0987645678",
  },
  {
    userId: "2",
    name: "User 2",
    birthday: "21/5/2000",
    address: "Ho Chi Minh City",
    classStudy: "20CT2",
    email: "user2@example.com",
    phone: "0987654321",
  },
  {
    userId: "3",
    name: "User 3",
    birthday: "3/12/1995",
    address: "Ha Noi",
    classStudy: "20CT3",
    email: "user3@example.com",
    phone: "0123456789",
  },
  {
    userId: "4",
    name: "User 4",
    birthday: "10/10/2005",
    address: "Can Tho",
    classStudy: "20CT4",
    email: "user4@example.com",
    phone: "0365987452",
  },
  {
    userId: "5",
    name: "User 5",
    birthday: "5/6/1990",
    address: "Hai Phong",
    classStudy: "20CT5",
    email: "user5@example.com",
    phone: "0547896321",
  },
  {
    userId: "6",
    name: "User 6",
    birthday: "20/9/1998",
    address: "Quang Ninh",
    classStudy: "20CT6",
    email: "user6@example.com",
    phone: "0987654321",
  },
  {
    userId: "7",
    name: "User 7",
    birthday: "12/3/1993",
    address: "Nha Trang",
    classStudy: "20CT7",
    email: "user7@example.com",
    phone: "0123456789",
  },
  {
    userId: "8",
    name: "User 8",
    birthday: "9/11/2000",
    address: "Vung Tau",
    classStudy: "20CT8",
    email: "user8@example.com",
    phone: "0365987452",
  },
  {
    userId: "9",
    name: "User 9",
    birthday: "15/7/1996",
    address: "Phu Quoc",
    classStudy: "20CT9",
    email: "user9@example.com",
    phone: "0547896321",
  },
  {
    userId: "10",
    name: "User 10",
    birthday: "18/4/2001",
    address: "Long An",
    classStudy: "20CT10",
    email: "user10@example.com",
    phone: "0987654321",
  },
];

const adminData = [
  {
    email: "admin1@example.com",
    name: "Admin 1",
  },
];

const roomData = [
  {
    numberRoom: 101,
    maxPeople: 4,
    currentPeople: [],
    roomPrice: 80,
    description:
      "Phòng rộng rãi và thoải mái, lý tưởng cho nhóm người muốn tận hưởng không gian thoải mái.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 102,
    maxPeople: 6,
    currentPeople: [],
    roomPrice: 120,
    description:
      "Phòng sang trọng với đầy đủ tiện nghi, phù hợp cho nhóm bạn hoặc du khách muốn tận hưởng không gian thoải mái.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 103,
    maxPeople: 4,
    currentPeople: [],
    roomPrice: 90,
    description:
      "Phòng tiện nghi với không gian ấm cúng và tinh tế, lựa chọn tốt cho những người muốn trải nghiệm cảm giác như ở nhà.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 104,
    maxPeople: 8,
    currentPeople: [],
    roomPrice: 150,
    description:
      "Phòng rộng lớn với không gian mở, phù hợp cho nhóm lớn muốn tận hưởng không gian thoải mái và tiện nghi.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 105,
    maxPeople: 6,
    currentPeople: [],
    roomPrice: 130,
    description:
      "Phòng được trang bị đầy đủ tiện nghi, với không gian thoải mái và sạch sẽ, giúp du khách có trải nghiệm lưu trú thoải mái và an tâm.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 106,
    maxPeople: 4,
    currentPeople: [],
    roomPrice: 100,
    description:
      "Phòng tinh tế với thiết kế hiện đại, đảm bảo sự thoải mái và tiện nghi cho du khách trong suốt thời gian lưu trú.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 107,
    maxPeople: 8,
    currentPeople: [],
    roomPrice: 160,
    description:
      "Phòng lớn và rộng rãi với đầy đủ tiện nghi, phù hợp cho nhóm lớn muốn tận hưởng không gian riêng tư và thoải mái.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
  {
    numberRoom: 108,
    maxPeople: 6,
    currentPeople: [],
    roomPrice: 140,
    description:
      "Phòng tiện nghi và thoải mái, mang đến cảm giác ấm áp như ở nhà cho du khách trong suốt thời gian lưu trú tại ký túc xá.",
    devices: [
      { name: "TV", status: true },
      { name: "Máy lạnh", status: false },
    ],
    services: [{ name: "Phục vụ ăn sáng", status: true, price: 10 }],
  },
];

module.exports = {
  userData,
  adminData,
  roomData,
};
