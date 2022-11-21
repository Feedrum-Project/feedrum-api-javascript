const {validId} = require("../../utils").validations;
const {UserModel} = require("../../models");

let upvoteUser = async (req, res) => {
	let {decoded, ...body} = req.body;
	let userId = req.query["id"];

	if (!userId
		|| !validId(userId))
		return res.status(400).send({code: "E_INVALID_PARAMETERS", msg: "user id is invalid"});

	if (userId == decoded._id)
		res.status(403).send({code: "E_NOT_ACCESS", msg: "you cannot upvote yourself"});

	if (!body.UPVOTE_IS_POSITIVE
		|| typeof body.UPVOTE_IS_POSITIVE != "boolean")
		return res.status(400).send({code: "E_INVALID_BODY", msg: "body parameter UPVOTE_IS_POSITIVE invalid"});

	let user, upvoteData, upvoteRank, userUpvoted;

	try {
		user = await UserModel.findOne({_id: userId});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get user"});
	}

	if (!user) 
		return res.status(404).send({code: "E_NOT_EXIST", msg: "user not exist"});

	if (body.UPVOTE_IS_POSITIVE == false) {
		upvoteData = {
			UPVOTED_BY: decoded._id,
			UPVOTE_POSITIVE: false,
		}

		upvoteRank = -3;
	}

	upvoteData = {
		UPVOTED_BY: decoded._id,
		UPVOTE_POSITIVE: true
	}

	upvoteRank = +3;

	user.ACCOUNT_UPVOTED_BY.push(upvoteData);
	user.ACCOUNT_RANK += upvoteRank

	try {
		userUpvoted = await user.save();
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot upvote user"});
	}

	console.log(userUpvoted);

	return res.status(200).send({status: "ok", msg: "user upvoted succesfully"})

}

module.exports = {
	upvoteUser: upvoteUser
}

