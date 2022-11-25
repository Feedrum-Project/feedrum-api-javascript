const emailValidation = require("node-email-validation");
const {ObjectId} = require("mongoose").Types;

const {validId, validEmail} = require("../../../utils").validations;
const {userUpdateParams} = require("../../../utils");


let userUpdateUsername = async (req, res) => {
	if (!req.body)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	if (!req.body.ACCOUNT_NAME
		|| typeof req.body.ACCOUNT_NAME != "string"
		|| req.body.ACCOUNT_NAME == ""
		|| req.body.ACCOUNT_NAME < 3
		|| req.body.ACCOUNT_NAME > 36)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "body paramete ACCOUNT_NAME invalid"});

	try {
		let user = await UserModel.findOne({_id: req.decoded._id});
		delete user._doc.ACCOUNT_HASHED_PASSWORD;
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't update your account"});
	}


	user.ACCOUNT_UPDATEDAT = new Date();
	user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();

	try {
		let updUser = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't update your account"});
	}


	return res.status(200).send({status: "ok", msg: "user updated succesfully", userUpdated: {id: updUser._id}});
}

module.exports = {
	updateUsername: userUpdateUsername
}

