const Verify = require("./VerifyTokenModel");
const Comentary = require("./ComModel");
const Image = require("./ImageModel");
const Admin = require("./AdminModel");
const Post = require("./PostsModel");
const User = require("./UserModel");

module.exports = {
	VerifyTokenModel: Verify,
	ComModel: Comentary,
	AdminModel: Admin,
	PostsModel: Posts,
	ImageModel: Image, 
	UserModel: User

};