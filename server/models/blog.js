const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  like: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  dislike: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  content: {
    type: String,
    required: true,
  },
  thumb: String,
  author: {
    type: String,
    default: "Admin",
  },
});

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
