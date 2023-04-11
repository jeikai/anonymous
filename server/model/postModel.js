const mongoose = require("mongoose");

//Định nghĩa cấu trúc dữ liệu khi POST hoặc GET trong Mongoose
const postSchema = new mongoose.Schema({
  userName: {
    type: String,
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
    default: "default.jpg",
  }
});

module.exports = mongoose.model("Posts", postSchema); 