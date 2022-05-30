const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")



console.log(a);
var a = 10;



const createCart = async (req, res) => {
    try {
        let userId = req.params.userId;

        let cartData = req.body;

        let findCartId = await cartModel.findOne({ userId: userId })

        let { items, totalPrice, totalItems } = cartData;


        if (!findCartId) {

            if (!items) {
                let newCart = {
                    items: [],
                    totalPrice: 0,
                    totalItems: 0,
                    userId: userId
                }

                let createCart = await cartModel.create(newCart);
                res.status(201).send({ status: true, message: "Cart Created", data: createCart })
            }

            if (items) {
                let productId = items[0].productId;
                let findProduct = await productModel.findById(productId).select({ price: 1, _id: 0 });

                let newProduct = {
                    totalPrice: findProduct.price,
                    totalItems: items.length,
                    items: items,
                    userId: userId
                }
                
                let createCart = await cartModel.create(newProduct);
                res.status(201).send({ status: true, message: "Cart Created", data: createCart });
            }
        }

        if (findCartId) {

            let productId = items[0].productId;

            let findProduct = await productModel.findById(productId).select({ price: 1, _id: 0 });
            let updateCart = await cartModel.findByIdAndUpdate(findCartId._id,{
                $push:{items}
            })

        }









    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}










module.exports = { createCart }

2