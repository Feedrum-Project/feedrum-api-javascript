let userLogout = async (req, res) => {
	res.clearCookie('userTok');
	res.clearCookie('refreshUserTok');

	res.status(200).send({status: "ok", msg: "user logouted succesfull"});
}

module.exports = {
	logoutUser: userLogout
}