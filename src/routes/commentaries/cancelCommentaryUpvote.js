const {ComModel, UserModel} = require("../../models");
const {validId} = require("../../utils").validations;

let cancelUpvote = async (req, res) => {
	let commentId = req.query["id"];
	let {decoded} = req.body;

	if (!commentId
		|| !validId(commentId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "commentary id is invalid"});

	let comment, user;

	try {
		comment = await ComModel.findOne({_id: commentId});
		user = await UserModel.findOne({_id: comment._doc.COMENTARY_AUTHOR});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post or/and user"});
	}

	if (!comment)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "commentary with this id not exist"});

	let upvotes = comment._doc.COMENTARY_UPVOTED_BY,
		upvote = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY == decoded._id);

	if (!upvote)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "you are not upvoted to this commentary"});

	comment.COMENTARY_UPVOTED_BY = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY != decoded._id);
	comment.COMENTARY_RANK -= 1;

	if (user) {
		user.ACCOUNT_RANK -= 2;

		user.ACCOUNT_UPDATEDAT = new Date();
		user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();
	}

	let commentSaved, userSaved;

	try {
		commentSaved = await comment.save();
		if (user)
			userSaved = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update post or/and user"});
	}

	return res.status(200).send({status: "ok", msg: "you upvote canceled successfull"})
}

module.exports = {
	cancelCommentaryUpvote: cancelUpvote
}