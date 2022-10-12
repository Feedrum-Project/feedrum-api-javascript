const {config} = require("dotenv");

const nodemailer = require("nodemailer");

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

	let message = {
		from: "noreply@saily",
		to: msgObj.to,
		subject: msgObj.subject,
		html: `<html>
			<body>
			<h2 style="background: #7685cf; color: white; text-align: center; padding: 15px; font-size: 36;">Saily App Mail Notifications</h2>
			<br>
			${msgObj.message}
			<br>
			<hr width="100%">
			<h6>Okto group</h6>
			</body>
			</html>`
	}

	try {
		await transporter.sendMail(message)
	} catch (e) {
		return e;
	}

}