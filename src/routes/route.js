const express = require("express")

const router = express.Router();

const { userRegister, loginUser, getUser, updateUserDetails } = require("../controller/userController");

const { createProducts, getProductByFilter, getProductByProductId, updateProductById, deleteProductById } = require("../controller/productController");
const { authentication } = require("../middleware/mid");

const { createCart, updateCart, getCart, deleteCart } = require("../controller/cartController")


// FEATURE I - User 
// User API
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/user/:userId/profile", authentication, getUser);
router.put("/user/:userId/profile", authentication, updateUserDetails);


// FEATURE II - Product 
// Product API
router.post("/products", createProducts);
router.get("/products", getProductByFilter);
router.get("/products/:productId", getProductByProductId);
router.put("/products/:productId", updateProductById);
router.delete("/products/:productId", deleteProductById);

// Feature III - Cart

router.post("/users/:userId/cart", authentication, createCart)
router.put("/users/:userId/cart", authentication, updateCart)
router.get("/users/:userId/cart", authentication, getCart)
router.delete("/users/:userId/cart", authentication, deleteCart)



module.exports = router;