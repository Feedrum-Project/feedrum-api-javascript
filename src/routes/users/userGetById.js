const {validId} = require("../../utils").validations;
const {UserModel} = require("../../models");


let userGetById = async (req, res) => {
	console.log("from /users/user/:id");
	if(!req.query["id"]
		|| !validId(req.query["id"]))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "`id` parameter apsend"});

	let user;
	
	try {
		user = await UserModel.findOne({id: req.query["id"]});
		delete user._doc.ACCOUNT_HASHED_PASSWORD;
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	

	return res.status(200).send({status: "ok", msg: "user was got succesfully", result: user});


}

module.exports = {
	getUserById: userGetById
}