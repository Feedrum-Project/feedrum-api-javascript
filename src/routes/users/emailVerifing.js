const {ObjectId} = require("mongoose").Types;
const uuid = require("uuid");

const {VerifyTokenModel, UserModel} = require("../../models/");


let validId = (id) => { 
    if(ObjectId.isValid(id)){

        if((String)(new ObjectId(id)) === id)
            return true;       

        return false;
    }

    return false;
}

let emailVerifying = async (req, res) => {
	if (!req.query)
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "couldn't get user id and verify code"});

	if ((typeof req.query ["id"] != 'string')|| !(req.query["id"]) || (req.query["id"] == ""))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "couldn't get user id"});

	if ((typeof req.query["id"] != 'string') || !(req.query["code"]) || (req.query["code"] == ""))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "couldn't get user verify code"});

	if (!validId(req.query["id"]))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user id is broken"});

	if (!uuid.validate(req.query["code"]))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user verify code is broken"});

	let verifyToken; 

	try {
		verifyToken = await VerifyTokenModel.findOne({TOKEN_USER_ID: req.query["id"], TOKEN_VERIFY_TOKEN: req.query["code"]});
	} catch (e) {
		console.log(e);
		return res.status(400).send({code: "E_SERVER_INTERNAL", msg: "couldn't check verify code"});
	}



	if (!verifyToken) {
		return res.status(404).send({code: "E_NOT_FINDED", code: "invalid verify code"});
	}

	let user;

	try {
		user = await UserModel.findOne({id: verifyToken._doc.TOKEN_USER_ID});
	} catch (e) {
		verifyToken.TOKEN_VERIFY_TOKEN = uuid.v4();

		try {
			let tokSaved = await verifyToken.save();
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get verify code"});
		}
		console.log(updUser);
		return res.status(400).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}


	user.ACCOUNT_VERIFYED_EMAIL = true;

	try {
		let updUser = await user.save();
	} catch {

		verifyToken.TOKEN_VERIFY_TOKEN = uuid.v4();

		try {
			let tokSaved = await verifyToken.save();
		} catch (e) {
			console.log(e);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get verify code"});
		}

		console.log(updUser);
		return res.status(400).send({code: "E_SERVER_INTERNAL", msg: "couldn't check email"});
	}

	verifyToken.TOKEN_VERIFY_TOKEN = uuid.v4();

	try {
		let tokSaved = await verifyToken.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get verify code"});
	}	

	return res.status(200).send("Email verifyed succesfully. You can live this page");
	

}

module.exports = {
	emailVerifing: emailVerifying
}