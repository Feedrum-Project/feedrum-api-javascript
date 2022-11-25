const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const {config} = require("dotenv");
const path = require("path");
const fs = require("fs");

config();

module.exports = async (msgObj) => { 
	if (!(typeof msgObj == 'object'))
		return TypeError("message must be object");

	if (Object.keys(msgObj).length == Object.keys({}).length)
		return Error("msg has not be empty");

	if (!(msgObj.to) || (msgObj.to == ""))
		return Error("`from` field has not be empty");

	if (!(msgObj.subject) || (msgObj.subject == ""))
		return Error("`subject` field has not be empty");

	if ((!msgObj.message) || (msgObj.message == ""))
		return Error("`message` field has not be empty");


	let transporter = nodemailer.createTransport({
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_AUTH_USER,
			pass: process.env.MAIL_AUTH_PASS
		}
	});

	let templatePath = path.join(__dirname, "../../assets/verify-message.hbs");
	let data = fs.readFileSync(templatePath, 'utf-8').toString();
	let template = handlebars.compile(data);

	let htmlToSend = template({message: msgObj.message});
	
	// let htmlToSend = data.replaceAll('href="#"', `href="${msgObj.link}"`);

	let message = {
		from: "noreply@saily",
		to: msgObj.to,
		subject: msgObj.subject,
		atachments: [{
			filename: "vyshyvanka.png",
			path: path.join(__dirname, "../../assets/vyshyvanka.png"),
			cid: "link"
		}],
		html: htmlToSend
	}

	try {
		await transporter.sendMail(message)
	} catch (e) {
		return e;
	}

}