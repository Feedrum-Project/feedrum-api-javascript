// API.Models.ImageModel

const {Schema, ObjectId, model} = require("mongoose");


// API.Models.ImageModel.Schema

// TODO: change all types to mongoose.Types

let imageScheme = new Schema({
	IMAGE_NAME: {
		type: String,
		required: true
	},
	IMAGE_PATH: {
		type: String,
		required: true
	},
	IMAGE_UPLOADED_BY: {
		type: ObjectId,
		required: true
	},
	IMAGE_CREATEDAT: {
		type: Date,
		default: new Date()
	},
	IMAGE_CREATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	}
}, {versionKey: false});

module.exports = Image = model("images", imageScheme);