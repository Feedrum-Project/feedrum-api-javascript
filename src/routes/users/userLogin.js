const emailValidation = require("node-email-validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {UserModel, AdminModel} = require("../../models");

let validEmail = (email) => {
	return emailValidation.is_email_valid(email);
}

let userLogin = async (req, res) => {
	if (Object.keys(req.body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "couldn't get body"});


	if (!(req.body.ACCOUNT_EMAIL) || !(req.body.ACCOUNT_PASSWORD))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "couldn't get email or/and password"});


	if (!(validEmail(req.body.ACCOUNT_EMAIL)))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "email is broken"});

	if (!(typeof req.body.ACCOUNT_PASSWORD == 'string'))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "password is broken"});

	let ACCOUNT_PASSWORD = req.body.ACCOUNT_PASSWORD.trim();

	if (ACCOUNT_PASSWORD.length <= 8 || ACCOUNT_PASSWORD.length >= 32)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "password length must be large than or equal 8 or less than or equal 32"});

	let user;

	try {
		user = await UserModel.findOne({ACCOUNT_EMAIL: req.body.ACCOUNT_EMAIL});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}


	if (!(user._doc.ACCOUNT_VERIFYED_EMAIL))
		return res.status(403).send({code: "E_NOT_EXIST", msg: "verify you email"});

	bcrypt.compare(req.body.ACCOUNT_PASSWORD, user._doc.ACCOUNT_HASHED_PASSWORD, async (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't compare passwords"});
		}

		if (!result)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "passwords don't identity"});

		let {ACCOUNT_HASHED_PASSWORD, ...userPayload} = user;


		let token = await jwt.sign(userPayload, process.env.USER_SECRET, {expiresIn: process.env.TOKEN_EXPIREAT});
		let refreshToken = await jwt.sign(userPayload, process.env.USER_SECRET, {expiresIn: process.env.TOKEN_EXPIREAT});

		res.cookie("userTok", token, {maxAge: process.env.TOKEN_EXPIREAT});
		res.cookie("refreshUserTok", refreshToken, {maxAge: process.env.TOKEN_EXPIREAT});

		res.send("logged succesfull")

	})
}

module.exports = {
	loginUser: userLogin
}