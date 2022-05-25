
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const { uploadFile } = require("../aws-service/aws")

const { json } = require("body-parser");

const saltRounds = 10;

const userModel = require("../models/userModel");

const { isValidData, isValidRequestBody, isValidEmail, isValidPhone, isValidName, pincodeValid, isValidObjectId } = require("../validator/validation");

//********************< Create User Starts >*********************//


const userRegister = async function (req, res) {
    try {

        let bodyData = JSON.parse(req.body.data);

        if (!isValidRequestBody(bodyData)) {
            return res.status(400).send({ status: false, message: "No data provided" });
        }

        let files = req.files
        let uploadedFileURL;
        if (files && files.length > 0) {
            uploadedFileURL = await uploadFile(files[0])
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }

        // Extract all attribute destructure
        let { fname, lname, email, phone, password, address } = bodyData;


        // Validation starts--------------

        if (!isValidData(fname)) {
            return res.status(400).send({ status: false, message: "First name is required." });
        }

        if (!isValidName.test(fname)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid first name" })
        }

        if (!isValidData(lname)) {
            return res.status(400).send({ status: false, message: " Last name is required." });
        }

        if (!isValidName.test(lname)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid last name" })
        }

        if (!isValidData(email)) {
            return res.status(400).send({ status: false, message: "Email is required." });
        }

        if (!isValidEmail.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid a email " });
        }

        let duplicateEmail = await userModel.findOne({ email });
        if (duplicateEmail) {
            return res.status(400).send({ status: false, msg: "Email already exist" });
        }

        if (!isValidData(phone)) {
            return res.status(400).send({ status: false, message: "Phone is required." });
        }

        if (!isValidPhone.test(phone)) {
            return res.status(400).send({ status: false, message: "Please enter a valid phone number" });
        }

        let duplicatePhone = await userModel.findOne({ phone });
        if (duplicatePhone) {
            return res.status(400).send({ status: false, msg: "Phone number already exist" });
        }

        if (!isValidData(password)) {
            return res.status(400).send({ status: false, message: "Password is required." });
        }

        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, msg: "Password should be minimum 8 characters and maximum 15 characters", });
        }

        // hashing password
        bodyData.password = await bcrypt.hash(password, saltRounds);

        // validation for address of shipping
        if (!isValidData(address.shipping.street)) return res.status(400).send({ status: false, message: "Shipping street is required." });
        if (!isValidData(address.shipping.city)) return res.status(400).send({ status: false, message: "Shipping city is required." });
        if (!isValidData(address.shipping.pincode)) return res.status(400).send({ status: false, message: "Shipping pincode is required." });
        if (!pincodeValid.test(address.shipping.pincode)) return res.status(400).send({ status: false, message: "Shipping pincode is incorrect." });

        // validation for address of shipping
        if (!isValidData(address.billing.street)) return res.status(400).send({ status: false, message: "Billing street is required." });
        if (!isValidData(address.billing.city)) return res.status(400).send({ status: false, message: "Billing city is required." });
        if (!isValidData(address.billing.pincode)) return res.status(400).send({ status: false, message: "Billing pincode is required." });
        if (!pincodeValid.test(address.billing.pincode)) return res.status(400).send({ status: false, message: "Billing pincode is incorrect." });

        // Add profileImage
        bodyData.profileImage = uploadedFileURL;

        let creatUser = await userModel.create(bodyData);

        res.status(201).send({ status: true, message: "User created successfully", data: creatUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

//********************< Create User Ends >*********************//


//********************< Login User Starts >*********************//

const loginUser = async function (req, res) {
    try {
        let bodyData = req.body;

        if (!isValidRequestBody(bodyData)) {
            return res.status(400).send({ status: false, message: "No data provided" });
        }

        let { email, password } = bodyData;

        if (!isValidData(email)) {
            return res.status(400).send({ status: false, message: "Email is required." });
        }

        if (!isValidEmail.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter valid a email " });
        }

        if (!isValidData(password)) {
            return res.status(400).send({ status: false, message: "Password is required." });
        }

        let findUser = await userModel.findOne({ email: email })
        if (!findUser) {
            return res.status(400).send({ status: false, message: "Email is not correct" })
        }

        let matchPassword = await bcrypt.compare(password, findUser.password)
        if (!matchPassword) {
            return res.status(400).send({ status: false, message: "Password in not correct" })
        }

        let token = jwt.sign({
            userId: findUser._id.toString(),
            batch: "Uranium",
            groupName: "15",
            orginization: "functionUp",
            iat: new Date() / 1000,      //(iat)Issued At- the time at which the JWT was issued.  
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, "functionUpProject-5-ProductsManagement")

        // Sending token in header response
        res.setHeader("Authorization", "Bearer" + token)

        const data = {
            user: findUser._id,
            token: token
        }

        res.status(200).send({ status: true, message: "User Successfully login", data: data })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

//********************< Login User Ends >*********************//

//********************< Get user details starts >*********************//

const getUser = async function (req, res) {
    try {

        let userId = req.params.userId;

        if (!isValidObjectId.test(userId)) {
            return res.status(400).send({ status: false, message: "Enter the valid User Id" })
        }

        let findUserId = await userModel.findById({ _id: userId });
        if (!findUserId) {
            return res.status(404).send({ status: false, msg: "No User Data Found" })
        }

        let userDetails = await userModel.find({ _id: findUserId })

        res.status(200).send({ status: true, msg: "All Books", data: userDetails });


    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}





//********************< Get user details Ends >*********************//






module.exports = { userRegister, loginUser, getUser };





