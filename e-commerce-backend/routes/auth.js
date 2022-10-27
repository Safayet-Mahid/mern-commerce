const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {

    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: CryptoJS.AES.encrypt(
        //     req.body.password,
        //     process.env.PASS_SEC
        // ).toString(),
        password: req.body.password
    });

    try {
        const savedUser = await newuser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json(err)
    }
})


//Login

router.post("/login", async (req, res) => {


    try {
        const user = await User.findOne({ username: req.body.username })


        !user && res.status(401).json("Wrong Credentials!")

        const savedPassword = user.password

        savedPassword !== req.body.password.toString() && res.status(401).json(" Incorrect Password")

        const accessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }

        )

        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accessToken })
        // res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }

})



module.exports = router