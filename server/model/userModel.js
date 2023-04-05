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
  age: {
    type: Number,
    required: true,
    default: 18,
  },
  likeNumber: {
    type: Number,
    default: 100,
  },
  avatarImage: {
    type: String,
    default: "default.jpg",
  },
});

module.exports = mongoose.model("Users", userSchema); 