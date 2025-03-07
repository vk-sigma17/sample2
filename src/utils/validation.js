const validation = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, email, password } = req.body;
    if(!firstName && !lastName){
        throw new Error("Please Enter Valid FirstName & LastName")
    }
    if(!validation.isEmail(email)){
        throw new Error("Enter a Valid Email!!");
    }
    if(!validation.isStrongPassword(email)){
        throw new Error("Enter A Strong Password!!");
    }
}

module.exports = validateSignupData;