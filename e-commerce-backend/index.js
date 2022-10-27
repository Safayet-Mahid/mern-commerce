const express = require("express")
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const mongoose = require("mongoose")

const dotenv = require("dotenv")

const useRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")


dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongoDb is connected")
    })
    .catch(err => console.log(err))




app.use("/api/user", useRoute)

app.use("/api/auth", authRoute)

app.use("/api/products", productRoute)

app.use("/api/cart", cartRoute)

app.use("/api/orders", orderRoute)

app.use("/api/checkout", stripeRoute)



app.listen(process.env.PORT || 5000, () => {
    console.log("connected to backend");
})