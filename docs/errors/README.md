# API code errors

all response in Feedrum API (but it has expections) returns in JSON

### Error base template
```json
{
	"code": "error code",
	"msg": "about error",
	"result": "if provided"
}
```

### Error codes

- `E_SERVER_INTERNAL`	- returns HTTP code `500`;  server have some  problems

- `E_INVALID_BODY`		- returns HTTP code `400`;  request's body has no valid parameters 

- `E_NOT_FOUND` 		- returns HTTP code `404`;  some object (user, post, comment, etc.) has not found (now uses rarely)

- `E_ALREADY_EXIST` 	- returns HTTP code `403`;  some object (user, account email, etc.) already exist

- `E_NOT_SIGNED` 		- returns HTTP code `400`;  you dont have authentication tokens

- `E_COULDNT_AUTH` 		- returns HTTP code `401`;  server cannot check token's valid

- `E_NOT_ACCESS` 		- returns HTTP code `403`;  you has no access to some resource (error would expected if you signed in)


### Error code aliases

- `E_NOT_EXIST` 		- aliase of `E_NOT_FOUND`.


### About non-JSON format of response

They're in generally absend. But if you load images at no rules, you would see response text (not JSON) about error