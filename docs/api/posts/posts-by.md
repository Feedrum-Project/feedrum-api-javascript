# API route `/posts/postsBy`

# GET `/posts/postsBy?id=some_id` - returns all posts by this author

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
	"msg": "",
	"result": "Array(API.Models.PostsModel)"
}
```
