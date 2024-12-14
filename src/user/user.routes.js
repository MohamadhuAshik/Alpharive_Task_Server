const express = require("express")
const { signup, login, getAllUser, getSpecificUser } = require("./user.controller")
const verifyToken = require("../auth/auth")


const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/getAllUser", getAllUser)
router.get("/getSpecifiUser", verifyToken, getSpecificUser)

module.exports = router