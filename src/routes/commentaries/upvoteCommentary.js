const {ComModel, UserModel} = require("../../models");
const {validId} = require("../../utils").validations;

let upvoteCommentary = async (req, res) => {
	let {decoded, ...body} = req.body;
	let commentId = req.query["id"];

	if (!commentId
		|| !validId(commentId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "commentary id is invalid"});

	if (typeof body.UPVOTE_IS_POSITIVE != 'boolean')
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body parameter UPVOTE_IS_POSITIVE invalid"});

	let comment, user;

	try {
		comment = await ComModel.findOne({_id: commentId});
		user = await UserModel.findOne({_id: comment._doc.COMENTARY_AUTHOR});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get commentary and/or user"});
	}

	if (!comment)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "commentary with this id not exist"});

	let upvoteBody, upvoteRank, userUpvoteRank;

	if (body.UPVOTE_IS_POSITIVE == false) {
		upvoteBody = {
			ACCOUNT_UPVOTED_BY: decoded._id,
			UPVOTE_POSITIVE: false
		}

		upvoteRank = -1;
		userUpvoteRank = -1;
	}

	upvoteBody = {
		ACCOUNT_UPVOTED_BY: decoded._id,
		UPVOTE_POSITIVE: false
	}

	upvoteRank = 1;
	userUpvoteRank = 1;

	let upvotes = comment._doc.COMENTARY_UPVOTED_BY;

	let upvote = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY == decoded._id);

	if (Object.keys(upvote).length != Object.keys([]).length) 
		return res.status(403).send({code: "E_NOT_ACCESS", msg: "you already upvoted this user. for change your upvote withdraw it"});

	comment.COMENTARY_UPVOTED_BY.push(upvoteBody);

	comment.COMENTARY_UPDATEDAT = new Date();
	comment.COMENTARY_UPDATEDAT_TIMESTAMP = Date.now();

	if (user) {
		user.ACCOUNT_RANK += userUpvoteRank;
		user.ACCOUNT_UPDATEDAT = new Date();
		user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();
	}

	let comentarySaved, userSaved;

	try {
		comentarySaved = await comment.save();
		if (user)
			userSaved = user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update post or user"});
	}

	return res.status(200).send({status: "ok", msg: "comentary upvoted successfully"});

}

module.exports = {
	upvoteCommentary: upvoteCommentary
}