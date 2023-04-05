//Sử dụng module export ra từ controller
const {register, getAllUsers, login} = require("../controllers/userController")   

const router = require("express").Router()

router.post("/Logup", register)
router.post("/login", login)
router.get('/allusers/:id', getAllUsers)
module.exports = router