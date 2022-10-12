const {UserModel} = require("../../models");

let userLogin = async (req, res) => {
	if (Object.keys(req.body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "couldn't get body"});

	if (!(req.body.ACCOUNT_EMAIL) || (req.body.ACCOUNT_EMAIL == ""))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "user email has not be empty"});
}

module.exports = {
	loginUser: userLogin
}