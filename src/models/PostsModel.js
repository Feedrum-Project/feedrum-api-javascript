const {ObjectId, Schema, model} = require("mongoose");

let postsSchema = new Schema({
	POST_HEADER: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 36
	},
	POST_BODY: {
		type: String,
		required: true,
		minLength: 600,
		maxLength: 15000
	},
	POST_AUTHOR: {
		type: ObjectId,
		required: true
	},
	POST_RANK: {
		type: Number,
		default: 0
	},
	POST_COMMENTS: {
		type: [ObjectId],
		default: []
	},
	POST_CREATEDAT: {
		type: Date,
		default: new Date()
	},
	POST_CREATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	},
	POST_UPDATEDAT: {
		type: Date,
		default: new Date()
	},
	POST_UPDATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	}
}, {versionKey: false});

module.exports = Posts = model("posts", postsSchema);