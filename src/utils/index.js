const {config} = require("dotenv");

const emailTransporter = require("./emailTransporter");

config()

module.exports = {
	emailTransporter: emailTransporter
}