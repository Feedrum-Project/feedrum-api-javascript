# API route /users/user/email/verify

# GET /users/user/email/verify - make your email verifyed 

Authentication: `none`

Queries: ```json
{
	"query_parameters": {
		"id": "Mongoose.Types.ObjectId",
		"token": "API.Models.VerifyTokenMOodel.Schema.TOKEN_VERIFY_TOKEN"
	}
}
```

Params: `none`

Body: `none`

Response: 
- Headers: `none`

- Body: "Email verifyed succesfully. You can live this page"


