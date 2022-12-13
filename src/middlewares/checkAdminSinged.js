// API.Routes.Middlewares.Admin.LoggedIn - middleware for checking admin's login

const jwt = require("jsonwebtoken");

const {AdminModel} = require("../models");

module.exports = async (req, res, next) => {
	if (!req.cookies.adminTok)
		return res.status(403).send({code: "E_NOT_SIGNED", msg: "invalid admin token"});

	jwt.sign(req.cookies.adminTok, process.env.ADMIN_SECRET, (err, decoded) => {
		if(err)
			return res.status(401).send({code: "E_COULDNT_AUTH", msg: "couldn't get admin token"});

		try {
			let admin = AdminModel({_id: decoded._id});
			if (!admin)
				return res.status(404).send({code: "E_NOT_FOUND", msg: "user with this token broken"});
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't check admin token"});
		}

		let {exp, iat, ...decode} = decoded;

		req.body.admin.decoded = decode;
	});

	next();
}