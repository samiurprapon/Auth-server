# JWT Authentication Server
Simple and effective method of developing JWT. Token based authentication

Express.js, Sequelize ORM is used in this project.


## Getting Started
### Prerequisites
- node.js 14.15.x
- npm 6.14.x

### Installing & Configuration
1) Install dependencies
```
    npm install
```
2) change database credential on `config/config.js`
```json
{
    "development" : {
        "username" : "username",
        "password" : "password",
        "database" : "database_development"
    }
}
```
3) write `node` on terminal and generate random `Secret Number` for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`
4) On terminal paste this code and press enter
```
    require('crypto').randomBytes(64).toString('hex');
``` 
5) create `.env` file on root and paste two generated value as follows
```env
    # server port
    PORT=3000

    # environment for production
    NODE_ENV=production

    # authentication
    ACCESS_TOKEN_SECRET=ae9dc2ea3ec0bd564a0aa227f0e7db4ae90df7ab8b2d102bd98ccfc63
    REFRESH_TOKEN_SECRET=8d7014df0afc704c5a9159427b95a6eb42f44d16d658c8e1b4673c61
``` 
**or** , Edit `config/secrets.json`
```json
{
    "PORT": 3000,
    "NODE_ENV": "development",
    "PASSWORD_SECRET": "secret1",
    "ACCESS_TOKEN_SECRET":"secret2",
    "REFRESH_TOKEN_SECRET": "secret3"
}
``` 

6) Run MySQL server on `apache` or `nginx` 
7) Create a new database and named as `database_development`
```query
CREATE DATABASE database_development;
```

### Run the server
```
    npm test
```

## APIs

### Auth Route

#### Register
`POST /api/auth/register`
```json
{
    "email" : "john@example.com",
    "password" : "123456",
    "type" : "user"
}
```
**Description**: creates a new user; first user will be assigned as an admin user. Password is stored in `HS256` format
#### Login
`POST /api/auth/login`
```json
{
    "email" : "john@example.com",
    "password" : "123456"
}
```
**Description**: logs in to the server. Server will return a JWT token as:
```json
{
  "message": "Login successfully!",
  "type": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ0eXBlIjoidmVuZG9yIiwiaWF0IjoxNjA4MTE5ODk3LCJleHAiOjE2MDgxMjI1OTd9.hkXhf7jq3DIGYxwI0zn_fQgFQKqdU7prqiPYRfunB2M",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRRZEpIZ1dScmo0TUM0ZzI3OHFZVEcuWS8vSTFJQWhaQ2guajdjVW9WNWpDYS81VERrWG91TyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgxMTk4OTcsImV4cCI6MTYxMDcxMTg5N30.C_PFsnhQgpBuxoEMsaKE6OJocoRTWkY33uZbRI5t3Ms"
}
```

#### Check 
`POST /api/auth/refresh` 
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqOEQ5WjllVno3N1ZWZWNLMjBZUHMuZWtFV004eThySHhFbXBpbHdsbWQvQmZISkFKdnZaQyIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjA4MTE5OTY4LCJleHAiOjE2MTA3MTE5Njh9.f3RYJvune4607aQSvXLOPxXtWKd03dPuZdaQk0LonWE

```

**Description**: checks the JWT. Refresh Token from `Authorization` from should be passed as `Url-encoded query` or `x-access-token` header

```json
{
  "message": "Token refreshed Successfully!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ0eXBlIjoidXNlciIsImlhdCI6MTYwODExOTk2OCwiZXhwIjoxNjA4MTIyNjY4fQ.PTc6H_HteOWZrTdRA0S_rnwiVjsNW57UYzVIurjlqWI"
}
```

#### Logout 
`POST /api/auth/logout`
#### Sends Access Token 
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ0eXBlIjoidmVuZG9yIiwiaWF0IjoxNjA4MTE5ODk3LCJleHAiOjE2MDgxMjI1OTd9.hkXhf7jq3DIGYxwI0zn_fQgFQKqdU7prqiPYRfunB2M

```
**Description**: 
```json
{
  "message": "Logout successfully!"
}
````

## License
This project is licensed under [GPL-3.0 License](https://opensource.org/licenses/GPL-3.0).  
Copyright (c) 2020 [Samiur Prapon](https://samiurprapon.github.io/).