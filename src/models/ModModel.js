const {Schema, model} = require("mongoose");

let modSchema = new Schema({
	MODERATOR_LOGIN: {
		type: String,
		required: true
	},
	MODERATOR_HASHED_PASSWORD: {
		type: String,
		required: true
	}
})