const { addpost } = require("../controllers/postController")

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

router.post("/addpost", upload.single("upload"), addpost)
module.exports = router