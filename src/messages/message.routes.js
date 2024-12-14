const express = require("express")
const verifyToken = require("../auth/auth")
const { sendMessage, getMessages } = require("./message.controller")


const router = express.Router()


router.post("/send", verifyToken, sendMessage)
router.get("/getMesages/:recipientId", verifyToken, getMessages)


module.exports = router
