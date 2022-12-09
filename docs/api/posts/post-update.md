# API Route /posts/post/update

### POST /posts/post/update - create a new post and save it to database

Authentication: `true`

Queries: `none`

Params: `none`

Body: 
```json
{
	"POST_HEADER": "API.Models.PostsModel.Schema.POST_HEADER",
	"POST_BODY": "API.Models.PostsModel.Schema.POST_BODY"
}
```

Results: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok",
	"msg": "post created succesfully",
	"result": "API.Models.PostsModel._doc"
}
```