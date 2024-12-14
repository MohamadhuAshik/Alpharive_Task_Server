const userModel = require("./user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    signup: async (req, res) => {
        try {
            const { name, email, password, mobile } = req.body

            if (!name || !email || !password || !mobile) {
                return res.status(400).json({ message: "All Fields Are Required" })
            }
            const checkUser = await userModel.findOne({ email: email })
            if (checkUser) {
                return res.status(409).json({ message: "User Already Exists" })
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await userModel({
                name: name,
                email: email,
                mobile: mobile,
                password: hashedPassword,
            })
            await newUser.save()
            res.status(200).json({ response_code: 200, message: "User Create SuccessFully" })

        } catch (err) {
            console.log(err)
            res.status(500).json({ response_code: 500, message: "Internal Server Error", err: err })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const dbuser = await userModel.findOne({ email: email })
            if (!dbuser) {
                return res.status(409).json({ message: "Wrong mailId" })
            }
            const isMatch = await bcrypt.compare(password, dbuser.password)

            if (!isMatch) {
                return res.status(409).json({ message: "Wrong Password" })
            }

            const payload = {
                id: dbuser._id,
                email: email,
                role: "user"
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            res.status(200).json({ response_code: 200, message: "Login SuccessFully", token: token })

        } catch (err) {
            console.log(err)
            res.status(500).json({ response_code: 500, message: "Internal Server Error", err: err })

        }
    },

    getAllUser: async (req, res) => {
        try {
            const Allusers = await userModel.find()
            res.status(200).json({ response_code: 200, message: "User Fetch SuccessFully", data: Allusers })

        } catch (err) {
            console.log(err)
            res.status(500).json({ response_code: 500, message: "Internal Server Error", err: err })
        }
    },

    getSpecificUser: async (req, res) => {
        try {
            const id = req.id
            console.log("id", id)
            const user = await userModel.findOne({ _id: id })
            res.status(200).json({ response_code: 200, message: "User Fetch SuccessFully", data: user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ response_code: 500, message: "Internal Server Error", err: err })
        }
    }
}