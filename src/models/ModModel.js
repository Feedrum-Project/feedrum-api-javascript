// API.Models.Unused.ModModel

const {Schema, model} = require("mongoose");


// API.Models.Unused.ModModel.Schema

// TODO: change all types to mongoose.Types

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