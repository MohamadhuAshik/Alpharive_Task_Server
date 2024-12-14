const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const userRoutes = require("./src/user/user.routes")
const messageRoutes = require("./src/messages/message.routes")


const app = express()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 4001

const connectionString = `mongodb://localhost:27017/Alpharive_Interview`

const dbRun = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("mongoDb Connected")
    } catch (err) {
        console.log(err)
    }
}

dbRun()

app.use("/user", userRoutes)
app.use("/message", messageRoutes)



app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`server is Running on http://localhost:${PORT}`)
})