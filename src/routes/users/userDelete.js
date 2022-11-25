const {ObjectId} = require("mongoose").Types

const {UserModel} = require("../../models");
const {validId} = require("../../utils").validations;



let userDelete = async (req, res) => {
	let {decoded, ...body} = req.body;
	if(Object.keys(body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	if(!(body.ACCOUNT_ID))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains `ACCOUNT_ID`"});

	if(!(validId(body.ACCOUNT_ID)))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_ID` is invalid"});

	try {
		let user = await UserModel.deleteOne({_id: body.ACCOUNT_ID});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}
	

	return res.status(200).send({status: "ok", msg: "user deleted succesfully"});
}

module.exports = {
	deleteUsers: userDelete
}