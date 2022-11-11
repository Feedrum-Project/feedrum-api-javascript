const {validId} = require("../../utils").validations;
const {PostsModel} = require("../../models");

let getAllPostsByAuthor = async (req, res) => {
	let authorId = req.query["id"];

	if (!authorId)
		authorId = req.body.decoded._id;

	if (!validId(authorId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "author ID is not valid"});

	let posts;

	try {
		posts = await PostsModel.find({POST_AUTHOR: authorId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post by this author"});
	}

	return res.status(200).send({status: "ok", msg: "posts got succesfully", authorId: authorId, result: posts});
}

module.exports = {
	getAllPostsByAuthor: getAllPostsByAuthor
}