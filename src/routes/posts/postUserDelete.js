const {PostsModel, ComModel} = require("../../models");

const {validId} = require("../../utils").validations;

let deletePostByUser = async (req, res) => {
	let postId = req.query["id"];

	if (!(postId) || !(validId(postId)))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "cannot get query param `id`"});

	let post;

	try {
		post = await PostsModel.findOne({_id: postId, POST_AUTHOR: req.body.decoded._id});

	} catch (e) {
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "sorry, but this post not exist or not your"});

	let deleted;

	try {
		if (await ComModel.find({COMENTARY_POST: postId}))
			deleted.comentaries = await ComModel.deleteMany({COMENTARY_POST: postId});

		deleted.post = await PostsModel.deleteOne({_id: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot delete post with embeded comentaries"});
	}

	return res.status(200).send({status: "ok", msg: "post and embeded comentaries deleted succesfully", result: deleted});
}