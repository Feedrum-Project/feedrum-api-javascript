# API code errors

all response in Feedrum API (but it has expections) returned in JSON, and errors not expection;

### Error base template
```json
{
	"code": "error code",
	"msg": "about error"
}
```

### Error codes

- `E_SERVER_INTERNAL` - return with HTTP code 500 and mean what on server 
- `E_INVALID_BODY` - return with HTTP code `400` and mean, what request body has no valid options 
- `E_NOT_FOUND` - return with HTTP code `404` and mean, what some object (user, post, comment, etc.) has not found
- `E_NOT_EXIST` - same, with `E_NOT_FOUND`
- `E_ALREADY_EXIST` - return with HTTP code `403` and mean what some object (user, account email, etc.) was been exist
- `E_NOT_SIGNED` - return with HTTP code `400` and mean what you dont have authentication tokens
- `E_COULDNT_AUTH` - return with HTTP code `401` and mean, what server cannot check what token is valid