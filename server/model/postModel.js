const mongoose = require("mongoose");

//Định nghĩa cấu trúc dữ liệu khi POST hoặc GET trong Mongoose
const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: 'Users'
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
  title: {
    type: String,
  },
  favorite: {
    type: String,
  },
  description: {
    type: String,
  },
  postImg: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Posts", postSchema); 