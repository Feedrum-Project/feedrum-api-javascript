const Verify = require("./VerifyTokenModel");
const Admin = require("./AdminModel");
const User = require("./UserModel");

const {connect} = require("mongoose");

module.exports = {
	VerifyTokenModel: Verify,
	AdminModel: Admin,
	UserModel: User
};