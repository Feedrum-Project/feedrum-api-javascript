const {PostsModel} = require("../../models");

const {validId} = require("../../utils").validations;

let deletePostByUser = async (req, res) => {
	let postId = req.query["id"];

	if (!(postId) || !(validId(postId)))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "cannot get query param `id`"});

	let post;

	try {
		post = await PostsModel.findOne({_id: postId});
	} catch (e) {
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}
}