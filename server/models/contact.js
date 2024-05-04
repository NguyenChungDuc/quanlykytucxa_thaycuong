const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Register", "Payment"],
  },
  idAdmin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancel", "Processing", "Success"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    ref: "Room",
  },
});

//Export the model
module.exports = mongoose.model("Contact", contactSchema);
