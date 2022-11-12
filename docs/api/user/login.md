# API Route `/users/user/login`

### `POST` `/users/user/login` - return user's authoentication tokens

Authentication: `false`

Queries: `none`

Params: `none`

Body: 
```json
{
	"ACCOUNT_EMAIL": "API.Models.UserModel.Schema.ACCOUNT_EMAIL",
	"ACCOUNT_PASSWORD": "API.Models.UserModel.Schema.ACCOUNT_PASSWORD"
}
```

Response:
- Headers: 
- - Cookies: `userTok`, `userRefreshTok`
- Body:
```json
{
	"status": "ok",
	"msg": "you are loggined succesfull"
}
```

