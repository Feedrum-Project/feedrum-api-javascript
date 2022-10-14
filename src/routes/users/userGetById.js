const {ObjectId} = require("mongoose").Types;

const {UserModel} = require("../../models");

let validId = (id) => {
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

let userGetById = async (req, res) => {
	if(!req.query["id"])
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "`id` parameter apsend"});

	if(!validId(req.query["id"]))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "`id` is broken"});

	let user;
	
	try {
		user = await UserModel.findOne({id: req.query["id"]});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't get user"});
	}

	

	delete user._doc.ACCOUNT_HASHED_PASSWORD;

	return res.status(200).send({status: "ok", user: user});


}

module.exports = {
	getUserById: userGetById
}