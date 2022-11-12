# API Route `/users/userupdate`

### `GET` `/users/userupdate` - update user data (for administrators)

Authentication: `true`

Queries: `none`

Params: `none`

Body:
```json
{
	"ACCOUNT_ID": "Mongoose.Types.ObjectId"
}
```

Response: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok",
	"msg": "user deleted succesfully"
}
```