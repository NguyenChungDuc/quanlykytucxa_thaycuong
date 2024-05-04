const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema(
  {
    numberRoom: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    currentPeople: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    roomPrice: {
      type: Number,
      required: true,
    },
    thumb: {
      type: String,
      default:
        "https://vimiss.vn/upload/image/tin-tuc/top-5-ky-tuc-xa-truong-dai-hoc-trung-quoc-dep-xin-xo-nhat-4.jpg",
    },
    images: [],
    description: {
      type: String,
    },
    devices: [
      {
        name: String,
        status: Boolean,
      },
    ],
    services: [
      {
        name: String,
        status: Boolean,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Room", roomSchema);
