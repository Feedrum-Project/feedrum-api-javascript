const {Router} = require("express");



const {sendEmailVerifyLink} = require("./sendEmailVerifyLink");
const {refreshUserToken} = require("./userTokenRefresh");
const {emailVerifing} = require("./emailVerifing");
const {deleteUser} = require("./user/userDelete");
const {updateUser} = require("./user/userUpdate");
const {getUserById} = require("./userGetById");
// const {updateUsers} = require("./userUpdate");
const {deleteUsers} = require("./userDelete");
const {createUser} = require("./userCreate");
const {logoutUser} = require("./userLogout");
const {loginUser} = require("./userLogin");
const {getUsers} = require("./usersGet");

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
	.get("/user/delete", singInCheckMiddleware, deleteUser);

userRoutes
	.get("/user/logout", singInCheckMiddleware, logoutUser);

userRoutes
	.get("/user/:id", singInCheckMiddleware, getUserById);



module.exports = userRoutes