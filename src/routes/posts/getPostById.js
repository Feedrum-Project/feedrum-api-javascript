const {validId} = require("../../utils").validations;
const {PostsModel} = require("../../models");

let getPostById = async (req, res) => {
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	let post;

	try {
		post = await PostsModel.findOne({_id: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "post with this name not exist"});

	return res.status(200).send({status: "ok", msg: "post got succesfully", result: post});
}

module.exports = {
	getPostById: getPostById
}