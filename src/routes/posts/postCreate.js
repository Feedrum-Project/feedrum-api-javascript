// const fs = require("fs");
const {markdownParse} = require("../../utils");
const {PostsModel} = require("../../models");

let postCreate = async (req, res) => {
	let {decoded, ...body} = req.body;
	if (!(body) || (Object.keys(body).length == Object.keys({}).length))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "cannot read body"});

	if (!(body.POST_HEADER) || (typeof body.POST_HEADER != "string") || (body.POST_HEADER == ""))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "cannot get post header"});

	if (!(body.POST_BODY) || (typeof body.POST_BODY != "string") || (body.POST_BODY == ""))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "cannot get post body"});

	if (body.POST_BODY.length < 650)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "minimal number of chars - 650"});

	let postBody = {
		POST_HEADER: body.POST_HEADER,
		POST_BODY: body.POST_BODY,
		POST_AUTHOR: decoded._id
	}

	let post = new PostsModel({
		POST_HEADER: body.POST_HEADER,
		POST_BODY: body.POST_BODY,
		POST_AUTHOR: decoded._id
	});

	let postSaved;

	try {
		postSaved = await post.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot create post"});
	}



	return res.status(200).send({status: "ok", msg: "post created succesfully", result: postSaved});
}

module.exports = {
	createPost: postCreate
}