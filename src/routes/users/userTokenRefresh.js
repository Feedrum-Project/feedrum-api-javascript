const jwt = require("jsonwebtoken");

const {UserModel} = require("../../models");

let userTokenRefresh = async (req, res) => {
	jwt.verify(req.cookies.refreshUserTok, process.env.USER_REFRESH_SECRET, async (err, decoded) => {
		if (err) {
			console.log(err);
			return res.status(406).send({code: "E_NOT_SIGNED", msg: "your refhresh token is broken"});
		}

		try {
			let user = await UserModel.findOne({_id: decoded._id});

			if (!user)
				return res.status(404).send({code: "E_NOT_EXIST", msg: "user with this refresh token broken"});
			
			delete user._doc.ACCOUNT_HASHED_PASSWORD;

			let userTok, userRefreshTok;

			try {
				userTok = jwt.sign(user._doc, process.env.USER_SECRET, {expiresIn: Number(process.env.TOKEN_EXPIREAT)});
				userRefreshTok = jwt.sign(user._doc, process.env.USER_REFRESH_SECRET, {expiresIn: Number(process.env.TOKEN_EXPIREAT + 86400000)});
			} catch (e) {
				console.log(e);
				return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot refresh tokens"});
			}

			res.cookie("userTok", userTok, {maxAge: Number(process.env.TOKEN_EXPIREAT)});
			res.cookie("refreshUserTok", userRefreshTok, {maxAge: Number(process.env.TOKEN_EXPIREAT) + 86400000});

			return res.status(200).send({status: "ok", msg: "tokens updated succesfully"});

		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't refresh token"});
		}


	})
}

module.exports = {
	refreshUserToken: userTokenRefresh
}