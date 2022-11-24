# API route /users/user/upvote/cancel

# PUT /users/user/upvote/cancel - it withdraw your upvote from user's upvotes array

Authentication: `true`

Queries: ```json
{
	"query_parameters": [{
		"name": "id",
		"type": "Mongoose.Types.ObjectId"
	}]
}
```

Params: `none`

Body: `none`


Response:
- Headers: `none`
- Body: ```json
{
	"status": "ok",
	"msg": "you upvote canceled successfull"
}
```
