# API route /users/user/username/update

### PUT /users/user/username/update - change your username to another

Authentication: `true`

Queries: `none`

Params: `none`

Body: 
```json
{
	"ACCOUNT_USERNAME": "API.Models.UserModel.Schema.ACCOUNT_USERNAME"
}
```

Response: 
- Headers: `none`
- Body: 
```json
	{
		"status": "ok", 
		"msg": "user updated succesfully", 
		"userUpdated": {
			"id": "Mongoose.Types.ObjectId"
		}
	}
```