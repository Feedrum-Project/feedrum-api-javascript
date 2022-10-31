const Verify = require("./VerifyTokenModel");
const Admin = require("./AdminModel");
const Post = require("./PostsModel");
const User = require("./UserModel");

const {connect} = require("mongoose");

module.exports = {
	VerifyTokenModel: Verify,
	AdminModel: Admin,
	PostsModel: Posts,
	UserModel: User
};