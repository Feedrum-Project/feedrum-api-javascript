# API code errors

all response in Feedrum API (but it has expections) returned in JSON,; errors not expection;

### Error base template
```json
{
	"code": "error code",
	"msg": "about error"
}
```

### Error codes

- `E_SERVER_INTERNAL`	- returning HTTP code `500`;  server have some  problems
- `E_INVALID_BODY`		- returning HTTP code `400`;  request's body has no valid parameters 
- `E_NOT_FOUND` 		- returning HTTP code `404`;  some object (user, post, comment, etc.) has not found (now uses rarely)
- `E_ALREADY_EXIST` 	- returning  HTTP code `403`; some object (user, account email, etc.) already exist
- `E_NOT_SIGNED` 		- returning  HTTP code `400`; you dont have authentication tokens
- `E_COULDNT_AUTH` 		- returning  HTTP code `401`; server cannot check token's valid
- `E_NOT_ACCESS` 		- returning HTTP code `403`;  you has no access to some resource (error would expected if you signed in)

### Error code aliases

- `E_NOT_EXIST` 		- aliase of `E_NOT_FOUND`.