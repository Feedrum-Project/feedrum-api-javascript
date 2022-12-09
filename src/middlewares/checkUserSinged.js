const jwt = require("jsonwebtoken");


const {UserModel} = require("../models")

module.exports = async (req, res, next) => {

	if (req.originalUrl == '/users/user/login/refresh') 
		return next();
	

	if (!req.cookies.userTok && !req.cookies.refreshUserTok) 
		return res.status(400).send({code: "E_NOT_SIGNED", msg: "you are not logined"});

	jwt.verify(req.cookies.userTok, process.env.USER_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err);
			return res.status(401).send({code: "E_COULDNT_AUTH", msg: "couldn't get your auth token or it not valid"});
		}

		try {
			let user = await UserModel.findOne({ACCOUNT_EMAIL: decoded.ACCOUNT_EMAIL, ACCOUNT_NAME: decoded.ACCOUNT_NAME, _id: decoded._id});

			if(!user
				|| user == null) {
				return res.status(404).send({code: "E_NOT_FOUND", msg: "user with this token broken"});
			}

			let {exp, iat, ...decode} = decoded;

			req.body.decoded = decode;

			return next();

		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot check account valid"})
		}
		
	});


	
}