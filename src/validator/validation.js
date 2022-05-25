let isValidData = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "number" && value.toString().trim().length === 0) return false
    return true;
}

let isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

let isValidName = (/^[a-zA-Z ]*$/);

let isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

let isValidPhone = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

let pincodeValid = (/(^[0-9]{6}(?:\s*,\s*[0-9]{6})*$)/)


let isValidObjectId = /^[0-9a-fA-F]{24}$/;




module.exports = { isValidData, isValidRequestBody, isValidEmail, isValidPhone, isValidObjectId, isValidName, pincodeValid }