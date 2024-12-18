const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel