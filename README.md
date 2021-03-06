﻿# sample-passport-auth

1. npm install
2. Create [facebook](https://developers.facebook.com/) and [instagram](https://www.instagram.com/developer/) app ids
3. Create .env file and set env-variables
```
JWT_SECRET_KEY=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
```
4. sudo service mongod start
5. npm start

#### Create account with email

POST http://localhost:3000/auth/signup
```
BODY
email: 'youremail@gmail.com'
password: 'yourpassword'
```

POST http://localhost:3000/auth/login
```
BODY
email: 'youremail@gmail.com'
password: 'yourpassword'
```

#### Auth via social

GET http://localhost:3000/auth/facebook<br>
GET http://localhost:3000/auth/instagram<br>

Both return token

#### Get protected data

GET http://localhost:3000/profile
```
HEADER
Authorization: Bearer your_token
```

return your data like
```
{
  "_id": "5982e3e43ce2f42c443b3776",
   "facebookId": "6276396097532207",
}
```
