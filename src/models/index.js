const Verify = require("./VerifyTokenModel");
const Image = require("./ImageModel");
const Admin = require("./AdminModel");
const Post = require("./PostsModel");
const User = require("./UserModel");

const {connect} = require("mongoose");

module.exports = {
	VerifyTokenModel: Verify,
	AdminModel: Admin,
	PostsModel: Posts,
	ImageModel: Image, 
	UserModel: User

};