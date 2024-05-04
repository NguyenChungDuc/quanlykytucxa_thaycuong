const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    classStudy: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/R.3fc108d3f911ec7995359558b454bc66?rik=qc9xvhOtev%2fIYw&riu=http%3a%2f%2fwww.indiacatalog.com%2fimages%2fuser-icon-png.png&ehk=HutrEjtImDwwwTqzTCByS91AY7w1%2bVbwAkDppL6DLrc%3d&risl=&pid=ImgRaw&r=0",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

//Export the model
module.exports = mongoose.model("User", userSchema);
