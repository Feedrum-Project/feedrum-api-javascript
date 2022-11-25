# API route /users/user/verifyEmailLink

### GET /users/user/verifyEmailLink - send e-mail adress to your mail for verification

Authentication: `none`

Queries: `none`

Params: `none`

Body: ```json
{
	"ACCOUT_ID": "Mongoose.Types.ObjectId"
}
```

Response: 
- Headers: `none`
- Body: ```json
	{
		status: "ok", 
		msg: "verify link sended succesfully"
	}
```