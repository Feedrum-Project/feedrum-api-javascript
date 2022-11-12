const emailValidation = require("node-email-validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {UserModel, AdminModel} = require("../../models");
const {validId, validEmail} = require("../../utils").validations;

// let validEmail = (email) => {
// 	return emailValidation.is_email_valid(email);
// }

let userLogin = async (req, res) => {
	let {decoded, ...body} = req.body
	if (Object.keys(body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "couldn't get body"});


	if (!(body.ACCOUNT_EMAIL) || !(body.ACCOUNT_PASSWORD))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "couldn't get email or/and password"});


	if (!(validEmail(body.ACCOUNT_EMAIL)))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "email is broken"});

	if (!(typeof body.ACCOUNT_PASSWORD == 'string'))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "password is broken"});

	let ACCOUNT_PASSWORD = body.ACCOUNT_PASSWORD.trim();

	if (ACCOUNT_PASSWORD.length <= 8 || ACCOUNT_PASSWORD.length >= 32)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "password length must be large than or equal 8 or less than or equal 32"});

	let user;

	try {
		user = await UserModel.findOne({ACCOUNT_EMAIL: body.ACCOUNT_EMAIL});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	if (!user)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "couldn't find user"});

	if (!(user._doc.ACCOUNT_VERIFYED_EMAIL))
		return res.status(403).send({code: "E_NOT_EXIST", msg: "verify you email"});

	bcrypt.compare(body.ACCOUNT_PASSWORD, user._doc.ACCOUNT_HASHED_PASSWORD, async (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't compare passwords"});
		}

		if (!result)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "passwords don't identity"});

		let {ACCOUNT_HASHED_PASSWORD, ...userPayload} = user._doc;

		let token, refreshToken;

		try {
			token = await jwt.sign(userPayload, process.env.USER_SECRET, {expiresIn: Number(process.env.TOKEN_EXPIREAT)});
			refreshToken = await jwt.sign(userPayload, process.env.USER_REFRESH_SECRET, {expiresIn: Number(process.env.TOKEN_EXPIREAT) + 86400000});
		} catch (e) {
			console.log(e);
			return res.status(500).send({code:"E_SERVER_INTERNAL", msg: "cannot authenticate you"})
		}


		res.cookie("userTok", token, {maxAge: Number(process.env.TOKEN_EXPIREAT)});
		res.cookie("refreshUserTok", refreshToken, {maxAge: Number(process.env.TOKEN_EXPIREAT) + 86400000});

		res.status(200).send({status: "ok", msg: "you are logined succesfully"})

	})
}

module.exports = {
	loginUser: userLogin
}