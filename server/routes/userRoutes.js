//Sử dụng module export ra từ controller
const {register} = require("../controllers/userController")
const {login} = require("../controllers/userController")

const router = require("express").Router()

router.post("/Logup", register)
router.post("/login", login)

module.exports = router