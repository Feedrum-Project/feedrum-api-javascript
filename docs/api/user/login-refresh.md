# API Route `/users/user/login/refresh`

# GET `/users/user/login/refresh` - update you login tokens above expiring tokens

Authentication: `true`

Queries: `none`

Params: `none`

Body: `none`

Response: 
- Headers:
- - Cookies: `userTok`, `refreshUserTok`
- Body: 
```json
{
	"status": "ok",
	"msg": "tokens updated succesfully"
}
```