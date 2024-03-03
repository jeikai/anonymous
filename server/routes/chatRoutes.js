const { getChatResponse } = require("../controllers/chatController")
const router = require("express").Router();

router.post('/chat', getChatResponse);

module.exports = router;