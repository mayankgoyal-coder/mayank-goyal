const express = require("express")

const router = express.Router();

const { userRegister, loginUser, getUser, updateUserDetails } = require("../controller/userController");

const {createProducts,getProduct} = require("../controller/productController")
const { authentication } = require("../middleware/mid")

router.post("/register", userRegister)
router.post("/login", loginUser)
router.get("/user/:userId/profile", authentication, getUser)
router.put("/user/:userId/profile", authentication, updateUserDetails)

router.post("/products",createProducts)
router.get("/products",getProduct)














module.exports = router;