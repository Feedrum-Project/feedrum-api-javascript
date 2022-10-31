const {PostsModel} = require("../../models");

let postCreate = async (req, res) => {
	let {decoded, ...body} = req.body;
	if (!(body))
		return res.send('ajdscnaksjcnasc');
}

module.exports = {
	createPost: postCreate
}