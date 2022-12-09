# API route `/users/user/upvote`

# PUT `/users/user/upvote` - set you upvote in user's upvotes array

Authentication: `true`

Queries:
```json
{
	"query_parameters": [{
		"name": "id",
		"type": "Mongoose.Types.ObjectId"
	}]
}
```

Params: `none`

Body:
```json
{
	"UPVOTE_IS_POSITIVE": "Boolean"
}
```

Response: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok",
	"msg": "user upvoted successfull"
}
```


