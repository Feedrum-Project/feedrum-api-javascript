const {ComModel, PostsModel} = require("../../models");
const {validId} = require("../../utils").validations;

let createComentary = async (req, res) => {
	let {decoded, ...body} = req.body;
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	if (!body.COMENTARY_BODY
		|| typeof body.COMENTARY_BODY != "string"
		|| body.COMENTARY_BODY == ""
		|| body.COMENTARY_BODY.length < 16 
		|| body.COMENTARY_BODY.length > 256)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "comentary body don't match with requirements"});

	let post;

	try {
		post = await PostsModel.findOne({_id: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "cannot get post with this id"});

	let comentaryBody = {
		COMENTARY_AUTHOR: decoded._id,
		COMENTARY_POST: postId,
		COMENTARY_BODY: body.COMENTARY_BODY
	}

	let comentary = new ComModel(comentaryBody);
	let comentarySaved;

	try {
		comentarySaved = await comentary.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot post comentary"});
	}

	return res.status(200).send({status: "ok", msg: "comentary published successfully", result: comentarySaved});

}

module.exports = {
	createComentary: createComentary
}