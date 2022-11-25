const {PostsModel, UserModel} = require("../../models");
const {validId} = require("../../utils").validations;

let cancelUpvote = async (req, res) => {
	let {decoded, ...body} = req.body;
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	let post;

	try {
		post = await PostsModel.findOne({_id: postId});
		user = await UserModel.findOne({_id: post._doc.POST_AUTHOR});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post or/and user"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "post with this id not exist"});

	let upvotes = post._doc.POST_UPVOTED_BY,
	upvote = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY == decoded._id),
		postUpdated, userUpdated;

	if (Object.keys(upvote).length == Object.keys([]).length)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "you are not upvoted to this post"});

	post.POST_UPVOTED_BY = upvotes.filter(upvote => upvote.ACCOUNT_UPVOTED_BY != decoded._id);
	post.POST_RANK -= 1;

	post.POST_UPDATEDAT = new Date();
	post.POST_UPDATEDAT_TIMESTAMP = Date.now();

	if (user) {
		user.ACCOUNT_RANK -= 2;

		user.ACCOUNT_UPDATEDAT = new Date();
		user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();
	}

	try {
		postUpdated = await post.save();
		userUpdated = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update post or/and user"});
	}

	return res.status(200).send({status: "ok", msg: "you upvote canceled successfull"});

}

module.exports = {
	cancelPostUpvote: cancelUpvote
}