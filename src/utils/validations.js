const emailValidation = require("node-email-validation");
const {ObjectId} = require("mongoose").Types;

let validEmail = (email) => {
	return emailValidation.is_email_valid(email);
}

let validId = (id) => {
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

module.exports = {
    validId: validId,
    validEmail: validEmail
}