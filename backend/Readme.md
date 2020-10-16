## Register
POST URL - `http://localhost:<PORT NUMBER>/api/user/register`  
PARAMS
```
{
    "name":"Nrupul Dev",
    "email":"nrupul@masai.com",
    "password:"test1234"
}
```
RESPONSE  
Success (Status Code - `200`)
```
User Registered Successfully
```
Failure (Status Code - `400`)
```
Error messages according to different errors
```
### Login
POST URL - `http://localhost:<PORT NUMBER>/api/user/login` 
PARAMS
```
{
    "email":"nrupul@masai.com",
    "password":"test1234"
}
```
RESPONSE  
Success (Status Code - `200`)
```
{
    "_id": "5f8313193a261f3d650b0a23",
    "name": "Nrupul dev",
    "email": "nrupul@masai.com",
    "password": "$2a$10$ucWQ1i2hCN1/vofYyGLyhuw5k1YOu/yW7NUZFgewUILcT0JjiFzMW",
    "__v": 0
}
```
Failure (Status Code - `400`)
```
Failure messages accordingly
```
------------------------------------------------------
# Transaction API

## Post
POST URL - `http://localhost:<PORT NUMBER>/api/transaction/post`

PARAMS
```
{
 "user_id":"5f81aa84a266b30fd7217586",
 "title":"Salary",
 "type":"Credit/Debit",
 amount:5000,
}
```
RESPONSE  
Success (Status Code - `200`)
```
Transaction Details successfully posted
```
Failure (Status Code - `400`)
```
Failure messages accordingly
```
## Get
##### -- To get all the transaction details of the particular user.
#
Get URL - `http://localhost:<PORT NUMBER>/api/transaction/get?page=<Number>&limit=<Number>`

PARAMS
```
{
 "user_id":"5f81aa84a266b30fd7217586",
}
```
RESPONSE  
Success (Status Code - `200`)
```
{
    "current": [
        {
            "_id": "5f82c29b7fa3b273b2ffdae5",
            "user_id": "5f81aa84a266b30fd7217586",
            "title": "Salary",
            "type": "Credit",
            "amount": 5000,
            "timestamp": "2020-10-11T08:30:19.399Z",
            "__v": 0
        },
        {
            "_id": "5f82c3ca7fa3b273b2ffdae6",
            "user_id": "5f81aa84a266b30fd7217586",
            "title": "Salary",
            "type": "Debit",
            "amount": 6000,
            "timestamp": "2020-10-11T08:35:22.413Z",
            "__v": 0
        },
        {
            "_id": "5f82cca4404bb77e2e891f59",
            "user_id": "5f81aa84a266b30fd7217586",
            "title": "Lottery",
            "type": "Credit",
            "amount": 10000,
            "timestamp": "2020-10-11T09:13:08.702Z",
            "__v": 0
        }
    ]
}
```
Failure (Status Code - `400`)
```
Failure messages accordingly
```
##### -- To get all the Credit details of the particular user in descending order ( New to Old ).
#
Get URL - `http://localhost:<PORT NUMBER>/api/transaction/get/credit?page=<Number>&limit=<Number>`

PARAMS
```
{
 "user_id":"5f81aa84a266b30fd7217586",
}
```
RESPONSE  
Success (Status Code - `200`)
```
[
    {
        "_id": "5f82cca4404bb77e2e891f59",
        "user_id": "5f81aa84a266b30fd7217586",
        "title": "Lottery",
        "type": "Credit",
        "amount": 10000,
        "timestamp": "2020-10-11T09:13:08.702Z",
        "__v": 0
    },
    {
        "_id": "5f82c29b7fa3b273b2ffdae5",
        "user_id": "5f81aa84a266b30fd7217586",
        "title": "Salary",
        "type": "Credit",
        "amount": 5000,
        "timestamp": "2020-10-11T08:30:19.399Z",
        "__v": 0
    }
]
```
Failure (Status Code - `400`)
```
Failure messages accordingly
```
##### -- To get all the Debit details of the particular user in descending order ( New to Old ).
#
Get URL - `http://localhost:<PORT NUMBER>/api/transaction/get/debit?page=<Number>&limit=<Number>`

PARAMS
```
{
 "user_id":"5f81aa84a266b30fd7217586",
}
```
RESPONSE  
Success (Status Code - `200`)
```
[
    {
        "_id": "5f82c3ca7fa3b273b2ffdae6",
        "user_id": "5f81aa84a266b30fd7217586",
        "title": "Shopping",
        "type": "Debit",
        "amount": 6000,
        "timestamp": "2020-10-11T08:35:22.413Z",
        "__v": 0
    },
    {
        "_id": "5f82c3ca7fa3b273b2ffdae6",
        "user_id": "5f81aa84a266b30fd7217586",
        "title": "Party",
        "type": "Debit",
        "amount": 6000,
        "timestamp": "2020-10-11T08:35:22.413Z",
        "__v": 0
    }
]
```
Failure (Status Code - `400`)
```
Failure messages accordingly
```

