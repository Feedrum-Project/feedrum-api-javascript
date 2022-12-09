# API route /api/imgs/upload

# POST /api/imgs/upload - route for uploading images

Authentication: `true`

Query: `none`

Params: `none`

Body: `multipath/form-data(images with format png/(jpeg/jpg)/gif and size less than 4MB)`

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


