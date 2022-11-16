const {validId} = require("../../utils").validations;
const {PostsModel} = require("../../models");

let postUpdate = async (req, res) => {
	let {decoded, ...body} = req.body;
	let postId = req.query["id"];

	if (!postId 
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	if (!body.POST_HEADER
		|| typeof body.POST_HEADER != "string"
		|| body.POST_HEADER == "" 
		|| body.POST_HEADER.length < 16 
		|| body.POST_HEADER.length > 64)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "post header don't match with requirements"});

	if (!body.POST_BODY
		|| typeof body.POST_BODY != "string"
		|| body.POST_BODY == ""
		|| body.POST_BODY.length < 16)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "post body don't match with requirements"});

	let post, postUpd;

	try {
		post = await PostsModel.findOne({_id: postId, POST_AUTHOR: decoded._id});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "sorry, but this post not exist or not your"});

	post.POST_HEADER = body.POST_HEADER;
	post.POST_BODY = body.POST_BODY;

	post.POST_UPDATEDAT = new Date();
	post.POST_UPDATEDAT_TIMESTAMP = Date.now();

	try {
		postUpd = await post.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update your post"});
	}

	return res.status(200).send({status: "ok", msg: "post updated succesfully", result: postUpd});
}

module.exports = {
	updatePost: postUpdate
}