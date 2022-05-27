const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let cartSchema = new mongoose.Schema({

    userid: {
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: ObjectId,
                ref: "User",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema)







