# API route /imgs/delete/

# DELETE /imgs/delete?id=img_id - delete image by id

Authentication: `true`

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
	"result": "Array(Mongoose.DeleteDocument.Aknowledges)"
}
```
