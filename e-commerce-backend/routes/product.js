const { varifyTokenAndAdmin } = require("./varifyToken")

const router = require("express").Router()
const Product = require("../models/Product")

//CREATE
router.post("/", varifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.status(500).json(savedProduct)
})

//UPDATE
router.put("/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been deleted..")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)

    } catch (err) {

        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS AND OR BY QUERIES

router.get("/", async (req, res) => {
    let products;
    const qNew = req.query.new
    const qcategory = req.query.category

    try {
        if (qNew) {

            products = await Product.find().sort({ createdAt: -1 }).limit(1)

        }
        else if (qcategory) {
            products = await Product.find({
                categories: {
                    $in: [qcategory],
                },
            });
        }
        else {

            products = await Product.find()
        }

        res.status(200).json(products)

    }
    catch (err) {

        res.status(500).json(err)
    }

})


module.exports = router