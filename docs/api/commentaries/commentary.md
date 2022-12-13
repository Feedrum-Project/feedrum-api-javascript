# API route `/posts/commentaries/commentary`

# GET `/posts/commentaries/commentary?id=Mongoose.Types.ObjectId` - return commentary by id

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
	"msg": "commentary got successfully",
	"result": "API.Models.ComModel"
}
```