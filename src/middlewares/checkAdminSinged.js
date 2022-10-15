const jwt = require("jsonwebtoken");

const {UserModel} = require("../models");

module.exports = async (req, res, next) => {
	if (!req.cookies.adminTok)
		return res.status(403).send({code: "E_NOT_SIGNED", msg: "invalid admin token"});

	jwt.sign(req.cookies.adminTok, process.env.ADMIN_SECRET, (err, decoded) => {
		if(err)
			return res.status(401).send({code: "E_COULDNT_AUTH", msg: "couldn't get admin token"});

		try {
			let user = UserModel.findOne({_id: decoded.id});
			if(!user)
				return res.status(404).send({code: "E_NOT_FINDED", msg: "user with this token broken"});
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot check account valid"})
		}
	});

	next();
}