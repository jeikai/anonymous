const mongoose = require("mongoose");

//Định nghĩa cấu trúc dữ liệu khi POST hoặc GET trong Mongoose
const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    gender: {
        type: Boolean,
        required: true,
        default: 0,
    },
    viewNumber: {
        type: Number,
        default: 100,
    },
    likeNumber: {
        type: Number,
        default: 100,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },
  });
  
  module.exports = mongoose.model("Users", userSchema);