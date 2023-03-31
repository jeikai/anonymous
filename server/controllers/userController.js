const User = require("../model/userModel");
//Thư viện mã hoá mật khẩu
const bcrypt = require("bcrypt");

//Phương thức đăng kí trong module và được export ra để dùng cho module khác
//next cho phép ta điều khiển sang middleware tiếp theo
module.exports.register = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        //Câu lệnh truy vấn tím kiếm xem trong DB có tồn tại username này hay chưa
        const usernameCheck = await User.findOne({ userName });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        } else {
            //Câu lệnh này mã hoá pass với độ dài kí tự là 10
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                userName,
                password: hashedPassword,
            });
            delete user.password;
            return res.json({ status: true, user });
        }
    } catch (e) {
        next(e)
    }
};

module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({userName:  username });
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