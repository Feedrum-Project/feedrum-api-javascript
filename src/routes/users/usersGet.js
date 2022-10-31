const {UserModel} = require("../../models");

let usersGet = async (req, res) => {
	if (req.query && Object.keys(req.query).length != Object.keys({}).length) {
		if (req.query["limit"]){

			if (typeof req.query["limit"] != 'string')
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`limit` must be a number"});

			if (!(Number(req.query["limit"]))) 
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`limit` sholdn't  can convert to number"});

			let limit = Number(req.query["limit"]);
			
			if (!(limit % 10 == 0) || (limit == 0))
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`limit` shouldn't be a zero or have remainder"});

			try {
				let users = await UserModel.find().sort({'ACCOUNT_CREATEDAT_TIMESTAMP': -1}).limit(limit);
			} catch (e) {
				console.log(e);
				return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't create list of users"})
			}

			users.forEach(el => {
				delete el._doc.ACCOUNT_HASHED_PASSWORD;
			});

			return res.status(200).send({status: "ok", result: users});
		}

	}

	try {
		let users = await UserModel.find().sort({'ACCOUNT_CREATEDAT_TIMESTAMP': -1}).limit(10);
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