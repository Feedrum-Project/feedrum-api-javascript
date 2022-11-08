const {UserModel} = require("../../models");

let usersGet = async (req, res) => {
	let users;

	try {
		users = await UserModel.find()
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't create list of users"});
	}


	users.forEach(el => {
		delete el._doc.ACCOUNT_HASHED_PASSWORD;
	});

	return res.status(200).send({status: "ok", result: users});
}

module.exports = {
	getUsers: usersGet
}