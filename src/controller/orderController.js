const orderModel = require('../models/orderModel');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");

const { isValidData, isValidRequestBody, isValidObjectId, isValidPrice, isValidEnum, } = require("../validator/validation");


const createOrder = async (req, res) => {
    try {

        let userId = req.params.userId;
        if (!isValidObjectId.test(userId)) {
            return res.status(400).send({ status: false, message: "Invalid user id" });
        }

        let findUserId = await userModel.findById({ _id: userId });
        if (!findUserId) {
            return res.status(404).send({ status: false, message: "User doesn't exists" });
        };

        const orderData = req.body

        const { cartId, totalItems, totalQuantity, totalPrice, cancellable, status } = orderData;

        let findCartDetails = await cartModel.findById(cartId);

        totalItems = findCartDetails.totalItems
        totalQuantity





    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}




module.exports = { createOrder }