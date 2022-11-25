const {Schema, ObjectId, model} = require("mongoose");

// TODO: change all types to mongoose.Types

let comSchema = new Schema({
	COMENTARY_AUTHOR: {
		type: ObjectId,
		required: true
	},
	COMENTARY_POST: {
		type: ObjectId,
		required: true
	},
	COMENTARY_BODY: {
		type: String,
		required: true,
		minLength: 16,
		maxLength: 256
	},
	COMENTARY_UPVOTED_BY: [{
		ACCOUNT_UPVOTED_BY: ObjectId,
		UPVOTE_POSITIVE: Boolean
	}, {_id: false}],
	COMENTARY_RANK: {
		type: Number,
		default: 0
	},
	COMENTARY_CREATEDAT: {
		type: Date,
		default: new Date()
	},
	COMENTARY_CREATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	},
	COMENTARY_UPDATEDAT: {
		type: Date,
		default: new Date()
	},
	COMENTARY_UPDATEDAT_TIMESTAMP: {
		type: Number,
		default: Date.now()
	}
}, {versionKey: false});

module.exports = Comentary = model("comentaries", comSchema);