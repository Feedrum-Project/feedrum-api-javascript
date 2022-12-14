const {Router} = require("express");

const {sendEmailVerifyLink} = require("./sendEmailVerifyLink");
const {emailRestoreLink} = require("./user/sendEmailsRestoreLink");
const {updateUsername} = require("./user/userUpdateUsername");
const {userGetUpvotes} = require("./user/userGetUpvotes");
const {userCancelUpvote} = require("./userCancelUpvote");
const {refreshUserToken} = require("./userTokenRefresh");
const {emailRestore} = require("./user/emailRestoring");
const {emailVerifing} = require("./emailVerifing");
const {deleteUser} = require("./user/userDelete");
const {getUserById} = require("./userGetById");
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
	.put("/user/username/update", singInCheckMiddleware, updateUsername);

userRoutes
	.put("/user/email/restore", emailRestore);

userRoutes
	.delete("/userdelete", adminSingedIn, deleteUsers);

userRoutes
	.get("/", getUsers);

userRoutes
	.get("/user/verifyEmailLink", sendEmailVerifyLink);

userRoutes
	.get("/user/restoreEmailLink", emailRestoreLink);

userRoutes
	.get("/user/email/verify",  emailVerifing);

userRoutes
	.get("/user/login", userNotSigned, loginUser);

userRoutes
	.get("/user/login/refresh", singInCheckMiddleware,refreshUserToken);

userRoutes
	.delete("/user/delete", singInCheckMiddleware, deleteUser);

userRoutes
	.get("/user/logout", singInCheckMiddleware, logoutUser);

userRoutes
	.put("/user/upvote", singInCheckMiddleware, upvoteUser);

userRoutes
	.put("/user/upvote/cancel", singInCheckMiddleware, userCancelUpvote);

userRoutes
	.get("/user/upvotes", singInCheckMiddleware, userGetUpvotes);

userRoutes
	.get("/user/me", singInCheckMiddleware, getMe);

userRoutes
	.get("/user", getUserById);



module.exports = userRoutes