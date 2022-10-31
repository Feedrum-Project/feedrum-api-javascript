const {config} = require("dotenv");

const checkUserSinged = require("./checkUserSinged");
const checkAdminSinged = require("./checkAdminSinged");
const checkUserNotSigned = require("./checkUserNotSigned")

config();

module.exports = {
	singInCheckMiddleware: checkUserSinged,
	userNotSigned: checkUserNotSigned,
	adminSingedIn: checkAdminSinged,

}