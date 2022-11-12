# API Route `/users/userdelete`

### `DELETE` `/users/delete` - delete user fro DB (for administrators and moderators)

Authentication (administrator or moderator): `true`

Queries: `none`

Params: `none`

Body: 
```json
{
	"ACCOUNT_ID": "Mongoose.Types.ObjectId"
}
```

Result: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok", 
	"msg": "user deleted succesfully"
}
```