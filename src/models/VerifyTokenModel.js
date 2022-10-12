const {Schema, model} = require("mongoose");
const {ObjectId} = require("mongoose").Types;

let verifyTokenScheme = new Schema({
	TOKEN_ACCOUNT_ID: {
		type: ObjectId,
		required: true
	},
	TOKEN_VERIFY_TOKEN: {
		type: String,
		required: true
	}
}, {versionKey: false});

module.exports = Verify = model("verifyTokens", verifyTokenScheme);

