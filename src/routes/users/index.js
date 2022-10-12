const {Router} = require("express");


const {sendEmailVerifyLink} = require("./sendEmailVerifyLink");
const {emailVerifing} = require("./emailVerifing");
const {getUserById} = require("./userGetById");
const {createUser} = require("./userCreate");
const {updateUser} = require("./userUpdate");
const {deleteUser} = require("./userDelete");
const {loginUser} = require("./userLogin");
const {getUsers} = require("./usersGet");




let userRoutes = new Router();

userRoutes
	.post("/useradd", createUser);

userRoutes
	.post("/userupdate", updateUser);

userRoutes
	.delete("/userdelete", deleteUser);

userRoutes
	.get("/",  getUsers);

userRoutes
	.get("/user/verifyEmailLink", sendEmailVerifyLink);

userRoutes
	.get("/user/email/verify", emailVerifing);

userRoutes
	.get("/user/login", loginUser);

userRoutes
	.get("/user/:id", getUserById);






module.exports = userRoutes