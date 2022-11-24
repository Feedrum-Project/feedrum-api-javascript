const {validId} = require("../../utils").validations;
const {UserModel} = require("../../models");

let cancelUpvote = async (req, res) => {
	let userId = req.query["id"];
	let {decoded} = req.body;

	if (!userId
		|| !validId(userId)) 
		return res.status(400).send({code: "E_INVALID_BODY", msg: "user id is invalid"});

	let user;

	try {
		user = await UserModel.findOne({_id: userId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get user"});
	}

	if (!user)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "user with this id not exist"});

	let upvotes = user._doc.ACCOUNT_UPVOTED_BY,
		userSaved;
	
	user.ACCOUNT_UPVOTED_BY = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY != decoded._id)

	try {
		userSaved = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update user"});
	}

	return res.status(200).send({status: "ok", msg: "you upvote canceled successfull"});
}

module.exports = {
	userCancelUpvote: cancelUpvote
}