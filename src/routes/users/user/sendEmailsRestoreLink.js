const {UserModel, VerifyTokenModel} = require("../../../models");
const {validId} = require("../../../utils").validations;
const {emailTransporter} = require("../../../utils");

let sendEmailRestoreLink = async (req, res) => {
	let {decoded, ...body} = req.body;

	if (!body.ACCOUNT_ID
		|| !validId(body.ACCOUNT_ID))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "user id is invalid"});

	let user, verifyToken;

	try {
		user =  await UserModel.findOne({_id: body.ACCOUNT_ID});
		verifyToken = await VerifyTokenModel.findOne({TOKEN_USER_ID: body.ACCOUNT_ID});
	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "cannot get user"});
	}

	if (!user && !verifyToken)
		return res.status(404).send({code: "E_NOT_EXIST", msg: "user with this id not exist"});

	delete user._doc.ACCOUNT_HASHED_PASSWORD;


	let verifyLink = `${process.env.DEFAULT_APP_LINK}/users/user/email/restore?id=${body.ACCOUNT_ID}&verifyToken=${verifyToken._doc.TOKEN_VERIFY_TOKEN}`

	let messageBody = `
	<h2>Hi, there!</h2>
	<p>Бачу, що ви зробили запит на відновлення імейлу. </p>
	<br>
	<p>Для цього перейдіть за посиланням нижче, попередньо скопіювавши його в рядок вашого браузеру</p>
	<br>
	<p><code>${verifyLink}</code></p>
	<br>
	<hr>
	<br>
	<p>Якщо ви не робили ніяких запитів, то проігноруйте це повідомлення та повідомте в підтримку Feedrum</p>
	`;


	try {
		let mail = await emailTransporter({
			to: user.ACCOUNT_EMAIL, 
			subject: "Email restore", 
			message: messageBody
		});

	} catch (e) {
		console.log(e);
		return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't send email"});
	}

	return res.status(200).send({status: "ok", msg: "verify link sended succesfully"});
}

module.exports = {
	emailRestore: sendEmailRestoreLink
}