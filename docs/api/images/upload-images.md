# API route /api/imgs/upload

# POST /api/imgs/upload - route for uploading images

Authentication: `true`

Query: `none`

Params: `none`

Body: 
```js
/**
 * multipart/form-data
 * 15 - max count of fields in one request
 * Object - field requirements
 **/

MultiPartForm(15,
{
	fieldName: 'image', // required parameter by multipart form and it does for all fields

	// your image
	fieldValue: Image({
		formats: ['jpeg/jpg', 'png', 'gif'],
		maxSizeForImage: 4 * 1024 * 1024
	}) 
}
)
```

Response: 
- Headers: `none`
- Body: 
```json
{
	"status": "ok", 
	"msg": "images uploaded succesfully", 
	"result": "Array(API.Models.ImageModel._doc)"
}
```


