// API.Models.UserModel

const {Schema, model, ObjectId} = require("mongoose");

// API.Models.UserModel.Schema

// TODO: change all types to mongoose.Types

let userScheme = new Schema({
	ACCOUNT_NAME: {
		type: String,
		unique: true,
		required: true,
		lowercase: true, //denis == denis, Denis = denis, DeNiS = denis
		minLength: 3, //den
		maxLength: 32
	},
	ACCOUNT_EMAIL: {
		type: String,
		unique: true,
		required: true,
		maxLength: 32
	},
	ACCOUNT_HASHED_PASSWORD: {
		type: String,
		required: true
	},
	ACCOUNT_VERIFYED_EMAIL: {
		type: Boolean,
		default: false
	},
	ACCOUNT_RANK: {
		type: Number,
		default: 0
	},
	ACCOUNT_UPVOTED_BY: [{
		ACCOUNT_UPVOTED_BY: ObjectId,
		UPVOTE_POSITIVE: Boolean
	}, { _id: false }],
	ACCOUNT_CREATEDAT: {
		type: Date,
		default: new Date
	},
	ACCOUNT_UPDATEDAT:{
		type: Date,
		default: new Date()
	},
	ACCOUNT_CREATEDAT_TIMESTAMP:
	{
		type: Number,
		default: Date.now()
	},
	ACCOUNT_UPDATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	}
}, {versionKey: false});

module.exports = User = model("Users", userScheme);

User.addUser = async (user) => {
	if (typeof user != 'object') return Error("`user` not be a object");
	if (Object.keys(user).length == Object.keys({}).length) return Error("`user` has not be empty");

	let userToSave = new User(user);
	try {
		let userSaved = await userToSave.save();
		return userSaved._id;
	} catch (e) {
		return Error(e);
	}

}

