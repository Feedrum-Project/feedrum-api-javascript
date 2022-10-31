module.exports = (req, res, next) => {
	if (req.cookies.userTok && req.cookies.refreshUserTok)
		return res.status(403).send({code: "E_NOT_ACCESS", msg: "you are signed"});

	next();
}