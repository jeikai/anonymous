const User = require("../model/userModel");
//Thư viện mã hoá mật khẩu
const bcrypt = require("bcrypt");

//Phương thức đăng kí trong module và được export ra để dùng cho module khác
//next cho phép ta điều khiển sang middleware tiếp theo
module.exports.register = async (req, res, next) => {
  try { 
    console.log(req.body)
    let password = req.body.password
    let avatarImage = req.body.avatarImage
    let userName = req.body.userName
    if (avatarImage != "default.jpg") {
      let check = avatarImage.substring(2, 3)
      let array = avatarImage.split(check)
      avatarImage = array[array.length - 1]
    }
    
    //Câu lệnh truy vấn tím kiếm xem trong DB có tồn tại username này hay chưa
    const usernameCheck = await User.findOne({ userName });
    console.log(usernameCheck)
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    } else {
      //Câu lệnh này mã hoá pass với độ dài kí tự là 10
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        userName: req.body.userName,
        password: hashedPassword, 
        age: req.body.age,
        gender: req.body.gender,
        avatarImage: avatarImage
      });
      console.log(user)
      user.save()
      return res.json({ status: true, user });
    }

  } catch (e) {
    console.log(e)
    next(e)
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ userName: username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    // $ne: tìm kiếm các giá trị không bằng giá trị ID đã cho
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "avatarImage",
      "userName",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
}; 