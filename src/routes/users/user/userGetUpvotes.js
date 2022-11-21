const {validId} = require("../../../utils").validations;
const {UserModel} = require("../../../models");

let userGetUpvotes = async (req, res) => {
	let {decoded, ...body} = req.body;
	let userId = req.query["id"];

	if (!userId
		|| !validId(userId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user id is invalid"});

	let user; 

	try {
		user = await UserModel.findOne({_id: userId});
		delete user._doc.ACCOUNT_HASHED_PASSWORD;
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get user"});
	}

	let upvotes = user._doc.ACCOUNT_UPVOTED_BY;

	return res.status(200).send({status: "ok", msg: "user upvotes geted succesfully", result: upvotes});
}

module.exports = {
	userGetUpvotes: userGetUpvotes
}