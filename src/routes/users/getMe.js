const {UserModel} = require("../../models");

let getMe = async (req, res) => {
	return res.status(200).send({status: "ok", msg: "you session data got succesfully", result: req.body.decoded});
}

module.exports = {
	getMe: getMe
}

