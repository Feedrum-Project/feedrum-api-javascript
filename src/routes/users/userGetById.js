const {validId} = require("../../utils").validations;
const {UserModel} = require("../../models");


let userGetById = async (req, res) => {
	if(!req.params["id"]
		|| !validId(req.params["id"]))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "`id` parameter apsend"});

	let user;
	
	try {
		user = await UserModel.findOne({id: req.params["id"]});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	delete user._doc.ACCOUNT_HASHED_PASSWORD;

	return res.status(200).send({status: "ok", msg: "user was got succesfully", result: user});


}

module.exports = {
	getUserById: userGetById
}