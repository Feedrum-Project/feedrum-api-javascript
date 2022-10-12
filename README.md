# saily-api

RESTful API of Saily.

# Endpoints

```
/users/ - all users
```

```
/users/user/:id - user by id
```

```
/users/user - this user
```

```
/users/useradd - create user

req.body = {
ACCOUNT_NAME: string, (3 < length < 32);
ACCOUNT_EMAIL: string;
ACCOUNT_PASSWORD: string, (8 < length < 32);
}
```
```
/users/userupdate - update user

req.body = {
ACCOUNT_ID: mongoose.Types.ObjectId (but string)
// and params to update (ACCOUNT_NAME, ACCOUNT_RANK, etc.)
}
```

```
/users/userdelete - delete user

req.body = {
ACCOUNT_ID: mongoose.Types.ObjectId (but string)
}
```

```
/users/user/verifyEmailLink

req.body = {
ACCCOUNT_ID: mongoose.Types.ObjectId(but string)
}
```

```
/user/email/verify?id=mongoose.Types.ObjectId&token=UUID - link to verifing email
```
