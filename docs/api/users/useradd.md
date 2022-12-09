# API route /users/useradd

### POST /users/useradd - create a new user

Authentication: `false`

Queries: `none`

Params: `none`

Body: 
```json
{
	"ACCOUNT_NAME": "API.Models.UserModel.Schema.ACCOUNT_NAME",
	"ACCOUNT_EMAIL": "API.Models.UserModel.Shema.ACCOUNT_EMAIL",
	"ACCOUNT_PASSWORD": "API.Models.UserModel.Schema.ACCOUNT_PASSWORD"
}
```

Response: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok", 
	"msg": "user created succesfully", 
	"user": {"id": "Mongoose.Types.ObjectId"}
}
```