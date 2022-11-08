const {PostsModel} = require("../../models");

let getPosts = async (req, res) => {
	try {
		let posts = await PostsModel.find();

		return res.status(200).send({status: "ok", result: posts});
	} catch (e) {
		console.log(e);
		return res.status(200).send({code: "E_SERVER_INTERNAL", msg: "cannot get posts"});
	}
}

module.exports = {
	getPosts: getPosts
}