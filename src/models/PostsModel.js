const {ObjectId, Schema, model} = require("mongoose");

let postsSchema = new Schema({
	POST_HEADER: {
		type: String,
		required: true
	},
	POST_BODY: {
		type: String,
		required: true
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
});

module.exports = Posts = model("posts", postsSchema);