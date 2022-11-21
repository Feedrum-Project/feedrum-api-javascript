# API Route `/api/users/user` 


### `GET /user` - get data about loggined user

Authorization: `true`

Body: `none`

Queries: `none`

Params: `none`

Response: 
- Headers: `none`
- Body:
```json
{
	"status": "ok",
	"msg": "user geted succesfully",
	"result": "API.Models.UserModel._doc"
}
```

### `GET /user/:id` - get another user by ID

Authorization: `true`

Body: `none`

Queries: `none` 

Params: `Mongoose.Types.ObjectId`

Response: 
- Headers: `none`
- Body:
```json
{
	"status": "ok",
	"msg": "user geted succesfully",
	"result": "API.Models.UserModel._doc"
}
```
