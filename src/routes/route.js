const express = require("express")

const router = express.Router();

<<<<<<< HEAD
const { userRegister, loginUser, getUser } = require("../controller/userController");

router.post("/register", userRegister)
router.post("/login", loginUser)
router.get("/user/:userId/profile", getUser)
=======
const { userRegister, loginUser, getUser, updateUserDetails } = require("../controller/userController");
const {createProducts} = require("../controller/productController")
const { authentication } = require("../middleware/mid")

router.post("/register", userRegister)
router.post("/login", loginUser)
router.get("/user/:userId/profile", authentication, getUser)
router.put("/user/:userId/profile", authentication, updateUserDetails)

router.post("/products",createProducts)
>>>>>>> 2798e4a797a32693a486b2c9f89d73524a42d60d














module.exports = router;