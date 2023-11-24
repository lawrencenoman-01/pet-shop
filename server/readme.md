# Authentication & Authorization using Express

Basic express.js project with basic routes:
* Express
* Bcrypt
* Joi
* Cors
* Sequelize
* MySQL2

---

## URL

_Server_
```
http://localhost:8080
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

## RESTful endpoints

### User Table -- Authentication & Authorization
#### POST /api/auth/register

> Register

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<email>"
  "first_name" : "<first_name>"
  "last_name" : "<last_name>"
  "password" : "<password>"
  "role" : "<admin_or_user>" *not required
}
```

_Response (201)_
```
{
    "data": {
      <data_register_account>
    }
    "status": "Successfully Register User Account"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Email does not same.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is required"
}
```

---

#### POST /api/auth/login

> Login

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<email>"
  "password" : "<password>"
}
```

_Response (200)_
```
{
    "email": "email",
    "role": "role",
    "token": "token",
    "status": "Successfully Login Account"
}
```

_Response (404 - Validation Error)_
```
{
    "status": "User with this email does not exist.",
}
```

_Response (404 - Validation Error)_
```
{
    "status": "Your Password does not correct.",
}
```

_Response (400 - Validation Failed)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is required"
}
```

---