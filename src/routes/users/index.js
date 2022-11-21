const {Router} = require("express");



const {sendEmailVerifyLink} = require("./sendEmailVerifyLink");
const {userGetUpvotes} = require("./user/userGetUpvotes");
const {refreshUserToken} = require("./userTokenRefresh");
const {emailVerifing} = require("./emailVerifing");
const {deleteUser} = require("./user/userDelete");
const {updateUser} = require("./user/userUpdate");
const {getUserById} = require("./userGetById");
// const {updateUsers} = require("./userUpdate");
const {deleteUsers} = require("./userDelete");
const {createUser} = require("./userCreate");
const {logoutUser} = require("./userLogout");
const {upvoteUser} = require("./userUpvote");
const {loginUser} = require("./userLogin");
const {getUsers} = require("./usersGet");
const {getMe} = require("./getMe");

const {singInCheckMiddleware, userNotSigned, adminSingedIn} = require("../../middlewares");


let userRoutes = new Router();

userRoutes
	.post("/useradd",userNotSigned, createUser);

// userRoutes
// 	.post("/userupdate", adminSingedIn ,updateUsers);

userRoutes
	.post("/user/update", singInCheckMiddleware, updateUser);

userRoutes
	.delete("/userdelete", adminSingedIn, deleteUsers);

userRoutes
	.get("/", singInCheckMiddleware ,getUsers);

userRoutes
	.get("/user/verifyEmailLink", sendEmailVerifyLink);

userRoutes
	.get("/user/email/verify",  emailVerifing);

userRoutes
	.get("/user/login",userNotSigned, loginUser);

userRoutes
	.get("/user/login/refresh", singInCheckMiddleware,refreshUserToken);

userRoutes
	.delete("/user/delete", singInCheckMiddleware, deleteUser);

userRoutes
	.get("/user/logout", singInCheckMiddleware, logoutUser);

userRoutes
	.put("/user/upvote", singInCheckMiddleware, upvoteUser);

userRoutes
	.get("/user/upvotes", singInCheckMiddleware, userGetUpvotes);

userRoutes
	.get("/user/me", singInCheckMiddleware, getMe);

userRoutes
	.get("/user/:id", singInCheckMiddleware, getUserById);



module.exports = userRoutes