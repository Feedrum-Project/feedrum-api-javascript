const emailValidation = require("node-email-validation");
const {ObjectId} = require("mongoose").Types;

const {validId, validEmail} = require("../../../utils").validations;
const {userUpdateParams} = require("../../../utils");


let userUpdate = async (req, res) => {
	if (!req.body)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});

	
	// let {decoded, ...updateData} = req.body;
	// console.log(decoded, updateData)

	if(Object.keys(req.body).length == Object.keys({}).length)
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains data for update"});

	updateDataKeys = Object.keys(req.body);
	
	for (el in updateDataKeys) {
		if(!(updateDataKeys[el] in userUpdateParams))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "body contains unless data"});
	}

	try {
		let user = await UserModel.findOne({_id: req.decoded._id});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't update your account"});
	}
	

	if (updateData["ACCOUNT_NAME"]) {
		if (!(typeof updateData["ACCOUNT_NAME"] == 'string'))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_NAME` not a string"});

		if (updateData["ACCOUNT_NAME"] == "")
			return res.status(400).send({code: "E_INVALID_BODY", msg: "body has empty `ACCOUNT_NAME`"});

		if (!(updateData["ACCOUNT_NAME"].length >= 3) || !(updateData["ACCOUNT_NAME"].length <= 32))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_NAME` must be large than or equal 3 and less than or equal 32"});
	
		if (updateData["ACCOUNT_NAME"] == user.ACCOUNT_NAME)
			return res.status(403).send({code: "E_ALREADY_EXIST", msg: "new name must not be identity to previouse"});

		user.ACCOUNT_NAME = updateData["ACCOUNT_NAME"];
	}	

	if (updateData["ACCOUNT_EMAIL"]) {
		if (!(typeof updateData["ACCOUNT_EMAIL"] == 'string'))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_EMAIL` must be a string"});

		if (!(validEmail(updateData["ACCOUNT_EMAIL"])))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_EMAIL` must be a valid"});

		if (updateData["ACCOUNT_EMAIL"] == user.ACCOUNT_EMAIL)
			return res.status(403).send({code: "E_ALREADY_EXIST", msg: "new email must not be identity to previouse"});

		user.ACCOUNT_EMAIL = updateData["ACCOUNT_EMAIL"];
		user.ACCOUNT_VERIFYED_EMAIL = false;
	}
	
	if(updateData["ACCOUNT_RANK"]) {
		if (!(typeof updateData["ACCOUNT_RANK"] == 'number'))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANK` must be a number"});

		if (updateData["ACCOUNT_RANK"] == NaN)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANK` has not be a NaN "});

		if (updateData < 0)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANK` has not be a negative number"});

		if (updateData > 3)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANK` has not be large than 3"});

		user.ACCOUNT_RANK += updateData["ACCOUNT_RANK"];

	}

	if(updateData["ACCOUNT_RANKED_BY"]){
		if (!(updateData["ACCOUNT_RANKED_BY"] instanceof Array))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANKED_BY` must be a array"});

		if (updateData["ACCOUNT_RANKED_BY"].length == [].length)
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANKED_BY` has not be empty"});

		for (el in updateData["ACCOUNT_RANKED_BY"]){
			if(!(validId(updateData[ACCOUNT_POSTS][el])))
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_RANKED_BY` contains invalid ID"});

			if(updateData["ACCOUNT_RANKED_BY"][el] in user.ACCOUNT_RANKED_BY)
				return res.status(403).send({code: "E_ALREADY_EXIST", msg: "this ranker already exist"});

			user.ACCOUNT_RANKED_BY.push(updateData["ACCOUNT_POSTS"][el]);
		}


	}
	
	if (updateData["ACCOUNT_POSTS"]){
		if (!(updateData["ACCOUNT_POSTS"] instanceof Array))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_POSTS` must be a array"});

		if (updateData["ACCOUNT_POSTS"].length == [].length)
			return res.status.send({code: "E_INVALID_BODY", msg: "`ACCOUNT_POSTS` has not be empty"});

		for (el in updateData["ACCOUNT_POSTS"]) {
			if(!(validId(updateData["ACCOUNT_POSTS"][el])));
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_POSTS` contains invalid ID"});

			if(updateData["ACCOUNT_POSTS"][el] in user.ACCOUNT_POSTS)
				return res.status(403).send({code: "E_ALREADY_EXIST", msg: "this post already exist"});

			user.ACCOUNT_POSTS.push(updateData["ACCOUNT_POSTS"][el]);
		}

	}

	if (updateData["ACCOUNT_COMMENTS"]){
		if (!(updateData["ACCOUNT_COMMENTS"] instanceof Array))
			return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_COMMENTS` must be a array"});

		if (updateData["ACCOUNT_COMMENTS"].length == [].length)
			return res.status.send({code: "E_INVALID_BODY", msg: "`ACCOUNT_COMMENTS` has not be empty"});

		for (el in updateData["ACCOUNT_COMMENTS"]) {
			if (!(validId(updateData["ACCOUNT_COMMENTS"][el])))
				return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_COMMENTS` contains invalid ID"});

			if(updateData["ACCOUNT_COMMENTS"][el] in user.ACCOUNT_COMMENTS)
				return res.status(403).send({code: "E_ALREADY_EXIST", msg: "this comment already exist"});

			user.ACCOUNT_COMMENTS.push(updateData["ACCOUNT_COMMENTS"][el]);
		}

	}

	user.ACCOUNT_UPDATEDAT = new Date();
	user.ACCOUNT_UPDATEDAT_TIMESTAMP = Date.now();

	try {
		let updUser = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't update your account"});
	}


	return res.status(200).send({status: "ok", msg: "user updated succesfully", userUpdated: {id: updUser._id}});
}

module.exports = {
	updateUser: userUpdate
}
