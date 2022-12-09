const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {validId, validEmail} = require("../../../utils").validations;
const {VerifyTokenModel, UserModel} = require("../../../models");


let emailRestore = async (req, res) => {
	let userId = req.query["id"],
		userVerifyTok = req.query["verifyToken"];

	let {ACCOUNT_NEW_EMAIL, ACCOUNT_PASSWORD} = req.body;


	if (!userId
		|| !validId(userId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user id is invalid"});

	if (!userVerifyTok
		|| !uuid.validate(userVerifyTok))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user verify code is invalid"});

	if (!ACCOUNT_NEW_EMAIL
		|| typeof ACCOUNT_NEW_EMAIL != 'string'
		|| ACCOUNT_NEW_EMAIL == ""
		|| !validEmail(ACCOUNT_NEW_EMAIL))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "email is invalid"});

	if (!ACCOUNT_PASSWORD
		|| typeof ACCOUNT_PASSWORD != 'string'
		|| ACCOUNT_PASSWORD == "")
		return res.status(400).send({code: "E_INVALID_BODY", msg: "password is invalid"});

	let user, userWithEmail, verifyToken;

	try {
		user = await UserModel.findOne({_id: userId});
		userWithEmail = await UserModel.findOne({ACCOUNT_EMAIL: ACCOUNT_NEW_EMAIL});
		verifyToken = await VerifyTokenModel.findOne({TOKEN_USER_ID: userId, TOKEN_VERIFY_TOKEN: userVerifyTok});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get user"});
	}

	if (!user && !verifyToken)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "user with this id not exist"});

	if (userWithEmail)
		return res.status(403).send({code: "E_ALREADY_EXIST", msg: "this email uses by another user"});

	bcrypt.compare(ACCOUNT_PASSWORD, user._doc.ACCOUNT_HASHED_PASSWORD, async (err, result) => {
		if (err) {
			console.log(err);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't compare password"});
		}

		if (!result)
			return res.status(403).send({code: "E_NOT_ACCESS", msg:"passwords don't match"});

		user.ACCOUNT_EMAIL = ACCOUNT_NEW_EMAIL;

		user.ACCOUNT_UPDATEDAT = new Date();
		user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();

		verifyToken.TOKEN_VERIFY_TOKEN = uuid.v4();

		let userSaved, verifyTokenSaved;

		try {
			userSaved = await user.save();
			verifyTokenSaved = await verifyToken.save();
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update user"});
		}

		return res.status(200).send({status: "ok", msg: "email updated succesfully. now go to login refresh"});

	});

}

module.exports = {
	emailRestore: emailRestore
}
