const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1]
        if (!token) {
            return res.status(409).json({ message: "Access Denied" })
        }
        const decodedToken = jwt.verify(token, "sdssdewefer")
        req.id = decodedToken.id
        // console.log(" req.id", req.id)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Invalid Token" })
    }
}

module.exports = verifyToken