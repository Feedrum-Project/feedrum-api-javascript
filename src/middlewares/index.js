const {config} = require("dotenv");

const checkUserNotSigned = require("./checkUserNotSigned");
const checkAdminSinged = require("./checkAdminSinged");
const checkUserSinged = require("./checkUserSinged");
const getFiles = require("./getFiles");

config();

module.exports = {
	singInCheckMiddleware: checkUserSinged,
	userNotSigned: checkUserNotSigned,
	adminSingedIn: checkAdminSinged,
	getFiles: getFiles
}