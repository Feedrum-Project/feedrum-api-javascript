const {ObjectId} = require("mongoose").Types;

const {emailTransporter} = require("../../utils");
const {UserModel, VerifyTokenModel} = require("../../models");


let validId = (id) => { 
    if(ObjectId.isValid(id)){

        if((String)(new ObjectId(id)) === id)
            return true;       

        return false;
    }

    return false;
}

let sendEmailVerifyLink = async (req, res) => {
	if (Object.keys(req.body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	if (validId(req.body.ACCOUNT_ID) == false)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_ID` is broken"});

	let user;
	
	try {
		user = await UserModel.findOne({_id: req.body.ACCOUNT_ID});
	} catch (e) {
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	delete user._doc.ACCOUNT_HASHED_PASSWORD;

	if(user._doc.ACCOUNT_VERIFYED_EMAIL)
		return res.status(403).send({code: "E_ALREADY_EXIST", msg: "email was be verifyed"});

	let userId = user._doc._id;

	let verifyToken;

	try {
		verifyToken = await VerifyTokenModel.findOne({TOKEN_USER_ID: userId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user verify code"});
	}



	userTok = verifyToken._doc.TOKEN_VERIFY_TOKEN;

	let verifyLink = `${process.env.DEFAULT_APP_LINK}/users/user/email/verify?id=${userId}&code=${userTok}`;

	try {
		let email = await emailTransporter({
			to: user.ACCOUNT_EMAIL, 
			subject: "Email verifing", 
			message: `Welcome, ${user._doc.ACCOUNT_NAME}! <br> Please, click <a href="${verifyLink}">here</a> to verify your email`
		});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't send email"});
	}



	return res.status(200).send({status: "ok", msg: "verify link sended succesfully"});

}

module.exports = {
	sendEmailVerifyLink: sendEmailVerifyLink
}