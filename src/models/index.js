const User = require("./UserModel");
const Verify = require("./VerifyTokenModel");

const {connect} = require("mongoose");

module.exports = {
	UserModel: User,
	VerifyTokenModel: Verify
};