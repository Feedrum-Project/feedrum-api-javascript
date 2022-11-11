const {ObjectId} = require("mongoose").Types;

const {emailTransporter} = require("../../utils");
const {UserModel, VerifyTokenModel} = require("../../models");

const {validId} = require("../../utils").validations;

let sendEmailVerifyLink = async (req, res) => {
	let {decoded, ...body} = req.body
	if (Object.keys(body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	if (validId(body.ACCOUNT_ID) == false)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_ID` is broken"});

	let user;
	
	try {
		user = await UserModel.findOne({_id: body.ACCOUNT_ID});
	} catch (e) {
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	if (!user) 
		return res.status(404).send({code: "E_NOT_EXIST", msg: "this account don't exist"});

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
		let mail = await emailTransporter({
			to: user.ACCOUNT_EMAIL, 
			subject: "Email verifing", 
			message: `Welcome, ${user._doc.ACCOUNT_NAME}! <br> Please, visit next page for veryfig email <br><br> <a href="${verifyLink}">${verifyLink}</a>`
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