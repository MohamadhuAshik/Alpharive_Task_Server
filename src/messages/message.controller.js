const messageModel = require("./message.model");
const moment = require("moment")

module.exports = {
    sendMessage: async (req, res) => {
        try {
            const { recipientId, content } = req.body
            if (!recipientId || !content) {
                return res.status(404).json({ message: "Bad Request" })
            }

            const message = new messageModel({
                sender: req.id,
                recipient: recipientId,
                content: content,
                createdat: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            await message.save();
            res.status(200).json({ response_code: 200, message: "Message save SuccessFully" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    getMessages: async (req, res) => {
        try {
            const id = req.id;
            const { recipientId } = req.params;

            if (!recipientId) {
                return res.status(400).json({ message: "Recipient ID is missing" });
            }
            const messages = await messageModel.find({
                $or: [
                    { sender: id, recipient: recipientId },
                    { sender: recipientId, recipient: id }
                ]
            }).populate('sender recipient');
            res.status(200).json({
                response_code: 200,
                message: "Conversation fetched successfully",
                data: messages
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}