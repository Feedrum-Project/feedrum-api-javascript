const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	if (!req.cookies.adminTok)
		return res.status(403).send({code: "E_NOT_SIGNED", msg: "invalid admin token"});

	jwt.sign(req.cookies.adminTok, process.env.ADMIN_SECRET, (err, decoded) => {
		if(err)
			return res.status(401).send({code: "E_COULDNT_AUTH", msg: "couldn't get admin token"});
	});

	next();
}