const {UserModel, PostsModel, ComModel} = require("../../../models");

let userDelete = async (req, res) => {
	let results = [];
	if (req.query["agree"] != "true")
		return res.status(403).send({code: "E_INVALID_PARAMETERS", msg: "if you agree with deleting your account, please, add to query `agree` with value `true`"});
	if (req.query["deleteCommentaries"] == 'true'){
		try {
			let commentaries = await ComModel.deleteMany({COMENTARY_AUTHOR: req.body.decoded._id});
			results.push({commentaries: commentaries});
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get comentaries"});
		}
	}

	if (req.query["deletePosts"] == 'true') {

		try {
			let posts = await PostsModel.deleteMany({POST_AUTHOR: req.body.decoded._id});
			results.push({posts: posts});
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get posts"});
		}
	}

	try {
		let userToDelete = await UserModel.deleteOne({_id: req.body.decoded._id});
		results.push({user: userToDelete});
		res.clearCookie("userTok");
		res.clearCookie("refreshUserTok");
		return res.status(200).send({status: "ok", msg: "you account was delete succesfully", result: results});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't delete your profile"});
	}
}

module.exports = {
	deleteUser: userDelete
}
