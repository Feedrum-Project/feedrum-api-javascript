const {config} = require("dotenv");

const emailTransporter = require("./emailTransporter");
const updateParamsList = require("./updateParamsList");
const validFuncs = require("./validations");

config()

module.exports = {
	emailTransporter: emailTransporter,
	userUpdateParams: updateParamsList,
	validations: validFuncs
}