const { varifyTokenAndAdmin, varifyToken, varifyTokenAndAuthorization } = require("./varifyToken")

const router = require("express").Router()
const Cart = require("../models/Cart")

//CREATE
router.post("/", varifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    const savedCart = await newCart.save()
    res.status(500).json(savedCart)
})

//UPDATE
router.put("/:id", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", varifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted..")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER CART

router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        })

        res.status(200).json(cart)

    } catch (err) {

        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS AND OR BY QUERIES

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router