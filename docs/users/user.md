# `/api/users/user` Path

## Allowed paths: 

### `GET /user` - get current body
Authorization: `true`
Body: `none`
Queries: `none`
Params: `none`
Response: `UserModel._doc`

### `POST /user/login` - return auth tokens
Authorization: `false`
Body: 
```
{
	ACCOUNT_EMAIL: String (must be valid email)
	ACCOUNT_PASSWORD: String (classic password reqirments)
}
```
Queries: `none`
Params: `none`
Response: 
```
req->cookie->userTok
req->cookie->refreshUserTok
```

### `GET /user/verifyEmailLink` - send email verification link
Authorization: `true`
Body: 
```
{
	ACCOUNT_ID: mongoose.Types.ObjectId (see mongoose docs)
}
```
Queries: `none`
Params: `none`
Response: `none`
