const {PostsModel, ComModel} = require("../../models");
const {validId} = require("../../utils").validations;

let updateComentary = async (req, res) => {
	let {decoded, ...body} = req.body;
	let postId = req.query["id"];

	if (!postId
		|| !validId(postId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "post id is invalid"});

	if (!body.COMENTARY_ID
		|| !validId(body.COMENTARY_ID))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "comentary id is invalid"});

	if (!body.COMENTARY_BODY
		|| typeof body.COMENTARY_BODY != "string" 
		|| body.COMENTARY_BODY == ""
		|| body.COMENTARY_BODY.length < 16
		|| body.COMENTARY_BODY.length > 256)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "comentary body don't match with requirements"});

	let post, comentary, comentaryUpdated;

	try {
		post = await PostsModel.findOne({_id: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get post"});
	}

	if (!post) 
		return res.status(404).send({code: "E_NOT_EXIST", msg: "sorry, but this post not exist"});

	try {
		comentary = ComModel.findOne({_id: body.COMENTARY_ID, COMENTARY_AUTHOR: decoded._id, COMENTARY_POST: postId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get comentary"});
	}

	if (!comentary)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "sorry, but this post comentary not exist"});

	comentary.COMENTARY_BODY = body.COMENTARY_BODY;

	comentary.COMENTARY_UPDATEDAT = new Date();	
	comentary.COMENTARY_UPDATEDAT_TIMESTAMP = Date.now();

	try {
		comentaryUpdated = await comentary.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot update comentary"});
	}

	return res.status(200).send({status: "ok", msg: "comentary updated succesfully"})
}

module.exports = {
	updateComentary: updateComentary
}