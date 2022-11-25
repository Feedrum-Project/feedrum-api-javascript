const {PostsModel, UserModel} = require("../../models");
const {validId} = require("../../utils").validations;


let upvotePost = async (req, res) => {
	let {decoded, ...body} = req.body;
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	if (typeof body.UPVOTE_IS_POSITIVE != 'boolean')
		return res.status(400).send({code: "E_INVALID_BODY", msg: "UPVOTE_IS_POSITIVE is invalid"});

	let post, user;

	try {
		post = await PostsModel.findOne({_id: postId});
		user = await UserModel.findOne({_id: post._doc.POST_AUTHOR});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "post with this id not exist"});

	let upvotes = post._doc.POST_UPVOTED_BY;
	let upvote = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY == decoded._id)

	if (Object.keys(upvote).length != Object.keys([]).length)
		return res.status(403).send({code: "E_NOT_ACCESS", msg: "you already upvoted this post. for change your upvote withdraw it"});

	let upvoteData, upvoteRank, userUpvoteRank;

	if (body.UPVOTE_IS_POSITIVE == false) {
		upvoteData = {
			ACCOUNT_UPVOTED_BY: decoded._id,
			UPVOTE_POSITIVE: false,
		}

		upvoteRank = -1;
		userUpvoteRank = -2;
	}

	upvoteData = {
		ACCOUNT_UPVOTED_BY: decoded._id,
		UPVOTE_POSITIVE: true
	}

	upvoteRank = 1;
	userUpvoteRank = 2;

	post.POST_UPVOTED_BY.push(upvoteData);
	post.POST_RANK += upvoteRank;

	post.POST_UPDATEDAT = new Date();
	post.POST_UPDATEDAT_TIMESTAMP = Date.now();

	if (user){
		user.ACCOUNT_RANK += userUpvoteRank;
		user.ACCOUNT_UPDATEDAT = new Date();
		user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();
	}
	let postSaved, userSaved;

	try {
		postSaved = await post.save();
		if (user)
			userSaved = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot save post or/and user"});
	}

	return res.status(200).send({status: "ok", msg: "post upvoted successfully"});
}

module.exports = {
	upvotePost: upvotePost
}