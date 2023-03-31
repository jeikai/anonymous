//Sử dụng module export ra từ controller
const {register} = require("../controllers/userController")

const router = require("express").Router()

router.post("/Logup", register)

module.exports = router