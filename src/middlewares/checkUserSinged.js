const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {

	if (!req.cookies.userTok) 
		return res.status(400).send({code: "E_NOT_SIGNED", msg: "you are not logined"});

	jwt.verify(req.cookies.userTok, process.env.USER_SECRET, (err, decoded) => {
		if (err) {
			console.log(err);
			return res.status(401).send({code: "E_COULDNT_AUTH", msg: "couldn't get your auth token or it not valid"});
		}


	});

	next();
}