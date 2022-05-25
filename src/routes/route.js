const express = require("express")

const router = express.Router();

const { userRegister, loginUser, getUser } = require("../controller/userController");

router.post("/register", userRegister)
router.post("/login", loginUser)
router.get("/user/:userId/profile", getUser)














module.exports = router;