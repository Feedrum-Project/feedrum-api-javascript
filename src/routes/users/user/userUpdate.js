const emailValidation = require("node-email-validation");
const {ObjectId} = require("mongoose").Types;

const {validId, validEmail} = require("../../../utils").validations;
const {userUpdateParams} = require("../../../utils");


let userUpdate = async (req, res) => {
	if (!req.body)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	
	// let {decoded, ...updateData} = req.body;
	// console.log(decoded, updateData)

	if(Object.keys(req.body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains data for update"});

	updateDataKeys = Object.keys(req.body);
	
	for (el in updateDataKeys) {
		if(!(updateDataKeys[el] in userUpdateParams))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "body contains unless data"});
	}

	try {
		let user = await UserModel.findOne({_id: req.decoded._id});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't update your account"});
	}
	

	if (updateData["ACCOUNT_NAME"]) {
		if (!(typeof updateData["ACCOUNT_NAME"] == 'string'))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_NAME` not a string"});

		if (updateData["ACCOUNT_NAME"] == "")
			return res.status(400).send({code: "E_INVALID_BODY", msg: "body has empty `ACCOUNT_NAME`"});

		if (!(updateData["ACCOUNT_NAME"].length >= 3) || !(updateData["ACCOUNT_NAME"].length <= 32))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_NAME` must be large than or equal 3 and less than or equal 32"});
	
		if (updateData["ACCOUNT_NAME"] == user.ACCOUNT_NAME)
			return res.status(403).send({code: "E_ALREADY_EXIST", msg: "new name must not be identity to previouse"});

		user.ACCOUNT_NAME = updateData["ACCOUNT_NAME"];
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
	updateUser: userUpdate
}

