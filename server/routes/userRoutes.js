//Sử dụng module export ra từ controller
const { register, getAllUsers, login } = require("../controllers/userController")

const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../Anonymous/anonymous/public/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
const router = require("express").Router()

router.post("/Logup", upload.single("uploadAva"), register)
router.post("/login", login)
router.get('/allusers/:id', getAllUsers)
module.exports = router