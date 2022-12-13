# API route `/posts/post/`

# GET `/posts/post` - returns post by id 

Authentication: `none`

Queries: 
```json
{
	"query_parameters": {
		"id": "Mongoose.Types.ObjectId"
	}
}
```

Params: `none`

Body: `none`

Response: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok",
	"msg": "post got successfully",
	"result": "API.Models.PostsModel"
}
```