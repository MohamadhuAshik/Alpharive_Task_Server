const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1]
        if (!token) {
            return res.status(409).json({ message: "Access Denied" })
        }
        const jwt_key = process.env.JWT_SECRET_KEY || "sdssdewefer"
        const decodedToken = jwt.verify(token, jwt_key)
        req.id = decodedToken.id
        // console.log(" req.id", req.id)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Invalid Token" })
    }
}

module.exports = verifyToken