const express = require("express")

const router = express.Router();

const { userRegister, loginUser, getUser, updateUserDetails } = require("../controller/userController");

const { createProducts, getProductByFilter, getProductByProductId, updateProductById, deleteProductById } = require("../controller/productController");
const { authentication } = require("../middleware/mid");

// FEATURE I - User 
// User API
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/user/:userId/profile", authentication, getUser);
router.put("/user/:userId/profile", authentication, updateUserDetails);


// FEATURE I - Product 
// Product API
router.post("/products", createProducts);
router.get("/products", getProductByFilter);
router.get("/products/:productId", getProductByProductId);
router.put("/products/:productId", updateProductById);
router.delete("/products/:productId", deleteProductById);




module.exports = router;