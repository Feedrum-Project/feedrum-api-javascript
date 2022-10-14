const {Schema, model, ObjectId} = require("mongoose");

let adminScheme = new Schema({
	ADMIN_LOGIN: {
		type: String,
		required: true
	},
	ADMIN_ACCES_LEVEL: {
		type: String,
		default: "MODER"
	},
	ADMIN_HASHED_PASSWORD: {
		type: String,
		required: true
	},
	ADMIN_CREATEDAT: {
		type: Date,
		default: new Date()
	},
	ADMIN_UPDATEDAT: {
		type: Date,
		default: new Date()
	},
	ADMIN_CREATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	},
	ADMIN_UPDATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	}

}, {versionKey: false});

module.exports = Admin = model("admins", adminScheme);