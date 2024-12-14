const mongoose = require("mongoose")

const Schema = mongoose.Schema


const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: String,
    createdat: String
})

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel