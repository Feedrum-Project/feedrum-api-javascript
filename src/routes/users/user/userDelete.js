const {UserModel} = require("../../../models");

let userDelete = async (req, res) => {
	if (!(req.query.agree))
		return res.status(403).send({code: "E_INVALID_PARAMETERS", msg: "if you agree with deleting your account, please, add to query `agree` with value `true`"});
	try {
		let userToDelete = await UserModel.deleteOne({_id: req.body.decoded._id});
		res.clearCookie("userTok");
		res.clearCookie("refreshUserTok");
		return res.status(200).send({status: "ok", msg: "you account was delete succesfully"});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't delete your profile"});
	}
}

module.exports = {
	deleteUser: userDelete
}
