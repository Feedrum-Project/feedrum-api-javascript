const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;

const emailValidation = require("node-email-validation");

const {UserModel, VerifyTokenModel} = require("../../models/");
const {validEmail} = require("../../utils").validations;

// let validEmail = (email) => {
// 	return emailValidation.is_email_valid(email);
// }

let createUser = async (req, res) => {
	let {userSigned, ...body} = req.body
	
	if (Object.keys(body).length == Object.keys({}).length) return res.status(400).send({code: "E_INVALID_BODY", msg: "body has not be empty"});
	if (!(body.ACCOUNT_NAME) || (body.ACCOUNT_NAME == "")) return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains `ACCOUNT_NAME`"});
	if(!(body.ACCOUNT_EMAIL) || (body.ACCOUNT_EMAIL == "")) return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains `ACCOUNT_EMAIL`"});
	if(!(body.ACCOUNT_PASSWORD) || (body.ACCOUNT_PASSWORD == "")) return res.status(400).send({code: "E_INVALID_BODY", msg: "body don't contains `ACCOUNT_PASSWORD`"});
	let {ACCOUNT_NAME, ACCOUNT_EMAIL, ACCOUNT_PASSWORD} = body;
	ACCOUNT_PASSWORD = ACCOUNT_PASSWORD.trim();
	ACCOUNT_NAME = ACCOUNT_NAME.trim();
	ACCOUNT_EMAIL = ACCOUNT_EMAIL.trim();

	let saltCount = Number(process.env.SALT_COUNT);

	if(!(ACCOUNT_NAME.length >= 3) || !(ACCOUNT_NAME.length <= 32))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_NAME` must be large than or equal 3 and less than or equal 32"});

	if(!(await validEmail(ACCOUNT_EMAIL)))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_EMAIL` must be valid"});

	if(!(ACCOUNT_PASSWORD.length >= 8) || !(ACCOUNT_PASSWORD.length <= 32))
		return res.status(400).send({code: "E_INVALID_BODY", msg: "`ACCOUNT_PASSWORD` must be large than or equal 8"});

	let userExistName = await UserModel.findOne({ACCOUNT_NAME: ACCOUNT_NAME});
	if(userExistName)
		return res.status(403).send({code: "E_ALREADY_EXIST", msg: "user with this name already exist"});

	let userExistEmail = await UserModel.findOne({ACCOUNT_EMAIL: ACCOUNT_EMAIL});
	if(userExistEmail)
		return res.status(403).send({code: "E_ALREADY_EXIST", msg: "user with this email already exist"});

	bcrypt.genSalt(saltCount, async (err, salt) =>{
		if (err){
			console.log(err);
			return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "could't gen password"});
		};

		bcrypt.hash(ACCOUNT_PASSWORD, salt, async (err, hash) => {
			if (err){
				console.log(err);
				return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "could't gen password"});
			}

			let user = {
				ACCOUNT_NAME: ACCOUNT_NAME,
				ACCOUNT_EMAIL: ACCOUNT_EMAIL,
				ACCOUNT_HASHED_PASSWORD: hash
			}

			let userCreated = await UserModel.addUser(user);
			
			if (userCreated instanceof Error) {
				console.log(userCreated);
				return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't create user"});
			}

			let userVerifyToken = new VerifyTokenModel({
				TOKEN_ACCOUNT_ID: userCreated,
				TOKEN_VERIFY_TOKEN: uuid()
			});
			
			let tokSaved = userVerifyToken.save();

			if(tokSaved instanceof Error) {
				console.log(tokSaved);
				return res.status(500).send({code: "E_SERVER_INTERNAL", msg: "couldn't create user"});
			}

			return res.status(200).send({status: "ok", msg: "user created succesfully", user: {id: userCreated}});
		});
	});
} 

module.exports = {
		createUser: createUser
}