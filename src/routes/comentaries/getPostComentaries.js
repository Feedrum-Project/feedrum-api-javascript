const {PostsModel, ComModel} = require("../../models");
const {validId} = require("../../utils").validations;

let getPostComentaries = async (req, res) => {
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	let post, comentaries;

	try {
		post = await PostsModel.findOne({_id: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "sorry, but this post not exist"});

	try {
		comentaries = await ComModel.find({COMENTARY_POST: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post comentaries"});
	}

	return res.status(200).send({status: "ok", msg: "post comentaries got succesfully", result: comentaries});
}

module.exports = {
	getPostComentaries: getPostComentaries
}