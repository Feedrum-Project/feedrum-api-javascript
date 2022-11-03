const {PostsModel} = require("../../models");

let postCreate = async (req, res) => {
	let {decoded, ...body} = req.body;
	if (!(body))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "cannot read body"});
	if (!(body.POST_HEADER) && (typeof body.POST_HEADER != "string") && (body.POST_HEADER == ""))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "cannot get post header"});

	let {authorId} = decoded._id;

	let postBody = {
		POST_HEADER: body.POST_HEADER.trim()
	}

	let post = new PostsModel(postBody);

	console.log(post);



}

module.exports = {
	createPost: postCreate
}