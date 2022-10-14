const {config} = require("dotenv");

const checkUserSinged = require("./checkUserSinged");
const checkAdminSinged = require("./checkAdminSinged");

config();

module.exports = {
	singInCheckMiddleware: checkUserSinged,
	adminSingedIn: checkAdminSinged
}