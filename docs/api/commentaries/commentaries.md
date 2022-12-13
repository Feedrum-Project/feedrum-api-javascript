# API route `/posts/commentaries`

# GET `/posts/commentaries?id=Mongoose.Types.ObjectId`- gets all commentaries in post

Authentication: `none`

Queries: 
```json
{
	"query_parameters":{
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
	"msg": "commentaries got successfully",
	"result": "Array(API.Models.ComModel)"
}
```