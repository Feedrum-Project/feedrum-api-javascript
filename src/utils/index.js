const {config} = require("dotenv");

const emailTransporter = require("./verifyEmailTransporter");
const updateParamsList = require("./updateParamsList");
const imageUpload = require("./imageUploader");
const validFuncs = require("./validations");

config();

module.exports = {
	emailTransporter: emailTransporter,
	userUpdateParams: updateParamsList,
	imageUpload: imageUpload,
	validations: validFuncs
}