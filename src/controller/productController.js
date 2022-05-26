const productModel = require('../models/productModel')
const { uploadFile } = require("../aws-service/aws");
const { isValidData, isValidRequestBody,isValidObjectId ,isValidPrice,isValidEnum} = require("../validator/validation");

const createProducts = async(req,res) =>{
   try{ let data = req.body
    if (!isValidRequestBody(data)) {
        return res.status(400).send({ status: false, message: "No data provided" });
    }
        let {title,description,price,currencyId,currencyFormat,isFreeShipping,style,availableSizes,installments} = data

        if (!isValidData(title)) 
            return res.status(400).send({ status: false, message: "title name is required." });
            let duplicateTitle = await productModel.findOne({ title });
        if (duplicateTitle) {
            return res.status(400).send({ status: false, msg: "title already exist" });
        }
        if (!isValidData(description)) 
        return res.status(400).send({ status: false, message: "description is required."});
        
        if (!isValidData(price)) 
        return res.status(400).send({ status: false, message: "price is required."});
        if(!isValidPrice.test(price))
        return res.status(400).send({ status: false, message: "not a valid number/decimal"});
        
       if(currencyId && currencyId !=="INR")
       return res.status(400).send({ status: false, message: "enter INR currency only"});
       if(currencyFormat && currencyFormat !=="₹")
       return res.status(400).send({ status: false, message: "enter indian currency format i.e '₹' "});

       let files = req.files;

       if (!isValidRequestBody(files)) {
           return res.status(400).send({ status: false, message: "Upload a image." });
       }

       if (files && files.length > 0) {
           awsUrl = await uploadFile(files[0]);
           data['productImage'] = awsUrl
       }
      
       if (!isValidData(availableSizes)) 
        return res.status(400).send({ status: false, message: "avilableSizes is required"})
        if(!isValidEnum(availableSizes))
        return res.status(400).send({ status: false, message: `only allow S, XS, M, X, L, XXL, XL`})
        if(installments){
            if(isNaN(installments)) return res.status(400).send({ status: false, message: "installments should be number only"})
        }

        let createdproduct = await productModel.create(data)
        res.status(201).send({satus:true,message:"product create successfully",data:createdproduct})


    }catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
} 


module.exports = {
    createProducts
}