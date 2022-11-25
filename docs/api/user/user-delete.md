# API route /users/user/delete

### GET /users/user/delete - permanently delete your account and, (otionaly) comments with posts 

Authentication: `true`

Queries: ```json
{
	"query_parameters": {
		`agree`: "Boolean",
		"deletePosts": "Boolean",
		"deleteCommentaries": "Boolean"
	}
}
```

Params: `none`

Body: `none`

Results: 
- Headers: `none`
- Body: ```json
	{
		status: "ok", 
		msg: "you account was delete succesfully", 
		result: "Array(Mongoose.DeleteDocument.Aknowledges)" // a fictional type who speaks for himself
	}
```