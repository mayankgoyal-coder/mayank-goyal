const express = require("express")
const bodyparser = require("body-parser");
const mongoose = require("mongoose")

const multer = require("multer")

const { AppConfig } = require("aws-sdk")


const port = process.env.PORT || 3000;

const route = require("./routes/route")

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.use(multer().any())

mongoose.connect("mongodb+srv://mongoabhishek:JGETcKMFq8k1RFrV@cluster0.nn6fz.mongodb.net/project5-group15Database?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongo is connected'))
    .catch(error => console.log(error));

app.use("/", route);

app.listen(port, function () {
    console.log(`Express app runnig on port ${port}`);
})