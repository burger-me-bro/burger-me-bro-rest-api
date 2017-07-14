![alt text](http://i.imgur.com/svIXMPg.png "Logo Title Text 1")


REST API for Burger Me
[![Build Status](https://travis-ci.org/burger-me-bro/burger-me-bro-rest-api.svg?branch=master)](https://travis-ci.org/burger-me-bro/burger-me-bro-rest-api)
## Routes

#### Signup and Login  ####  

**POST** for creating a new user account.

**/api/signup**  
* **Description**  
  A new user is created and authenticated by signing up with a username, password, and email.  The password is hashed and a token is returned that will be used to authorize the user for future logins.

* **Required Data**

  ##### Example Header
  ```
  none
  ```

  ##### Example Body
  ```
  {
    "username": "example_username",
    "password": "example_password",
    "email": "example_email@burger.com"
  }
  ```


* **Example Response**  
  ##### Successful
  ```
  eyJ0b2tlblNlZWQiOiJmZmE1MDRhYTNjNTA0NDk4MzFhOTA5NzUxOTVjNmM0ZmQ2ZDZkMzU4NzI5ZTYwZWRlYTdjODAzNTQ2Yjc4YWQwIiwiaWF0IjoxNDk5OTY1NjA1fQ
  ```
  ##### Response Codes
  200 - successful login  
  400 - missing username or password
  409 - duplicate key for username or password  
  500 - internal server error



**GET** for logging into a user account.

**/api/restaurant**  
* **Description**


* **Required Data**

  ##### Example Header
  ```
  Content-Type: 'application/json'
  Authorization: 'Basic <token>'
  ```

  ##### Example Body
  ```
  {
    "username":"example_user",
    "password":"example_password"
  }
  ```


* **Example Response**
##### Successful
```
eyJ0b2tlblNlZWQiOiJmZmE1MDRhYTNjNTA0NDk4MzFhOTA5NzUxOTVjNmM0ZmQ2ZDZkMzU4NzI5ZTYwZWRlYTdjODAzNTQ2Yjc4YWQwIiwiaWF0IjoxNDk5OTY1NjA1fQ
```
##### Response Codes
200 - successful signup  
400 - missing username, password, or email  
409 - duplicate key for username, password, or email  
500 - internal server error



#### Comments  

**POST** for creating a new comments.

**/api/comment**  
* **Description**  
    This  route creates a comment that is added to a burger. The user provides a title for the comment, its content and the burger id that the comments is for. A bearer token is required for this route.

* **Required Data**

  ##### Example Header
  ```
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI3ZThhOTBiYWN
  ```

  ##### Example Body
  ```
    {
              "title": "This burger is lit!",
              "content": "Yo let me tell you about this burger. It's fire bruh.",
              "burger": "5967c156958a9c00114538f6"
    }
  ```


* **Example Response**  
  ##### Successful
  ```
    {
        "__v": 0,
        "user": "5967cc7de4d0c10011dc4e16",
        "title": "This burger is lit!",
        "content": "Yo let me tell you about this burger. It's fire bruh.",
        "burger": "5967c156958a9c00114538f6",
        "date": "2017-07-13T19:41:30.296Z",
        "_id": "5967cceae4d0c10011dc4e17"
    }
  ```
  ##### Response Codes
  200 - successful creation of a comment
  400 - missing authorization header, title, content or burger id
  409 - duplicate keys
  500 - internal server error



**GET** used to retrieve a comment by getting the id

**/api/restaurant/:id**  
* **Description**
    Returns the contents of the comment. The user must provide the comment id and pass it in the url.

* **Required Data**

  ##### Example Header
  ```
    None
  ```

  ##### Example Body
  ```
	none
  ```


* **Example Response**
##### Successful
```
      {
        "_id":"5967cceae4d0c10011dc4e17",
        "user":"5967cc7de4d0c10011dc4e16",
        "title":"This burger is lit!",
        "content":"Yo let me tell you about this burger. It's fire bruh.",
        "burger":"5967c156958a9c00114538f6",
        "date":"2017-07-13T19:41:30.296Z",
        "__v":0
       }
```
##### Response Codes
  200 - successfully retrieve a comment
  404 - invalid comment id
  500 - internal server error

**PUT** used to update the title and the content of the comment
**/api/restaurant/:id**  

* **Description**
    The user provides the updated values of the content or the title properties. In order of users to successfully update the values a Bearer token is required. The user must provide the comment id and pass it in the url.

* **Required Data**

  ##### Example Header
  ```
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI3ZThhOTBiYWN
  ```

  ##### Example Body
  ```
	{
	"title": "Wasabi plus burger == life", //optional
	"content":"" //optional
	}
  ```


* **Example Response**
##### Successful
```
	{
        "_id":"5967cceae4d0c10011dc4e17",
        "user":"5967cc7de4d0c10011dc4e16",
        "title":"Wasabi plus burger == life",
        "content":"Yo let me tell you about this burger. It's fire bruh.",
        "burger":"5967c156958a9c00114538f6",
        "date":"2017-07-13T19:41:30.296Z",
        "__v":0
    }
```
##### Response Codes
  200 - successfully retrieve a comment
  400 - invalid token
  400 - invalid properties
  404 - invalid comment id
  500 - internal server error

**DELETE** used to update the title and the content of the comment

**/api/restaurant/:id**  
* **Description**
    The user provides the updated values of the content or the title properties. In order of users to successfully update the values a Bearer token is required. The user must provide the comment id and pass it in the url.

* **Required Data**

  ##### Example Header
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI3ZThhOTBiYWN
  ```

  ##### Example Body
  ```
	none
  ```


* **Example Response**
##### Successful
##### Response Code  - **204**
##### Body
```
	none
```
##### Response Codes
  204 - successfully retrieve a comment
  400 - invalid token
  400 - invalid properties
  404 - invalid comment id
  500 - internal server error


#### Restaurant  ####  

**POST** for creating a new restaurant.

**/api/restaurant**  
* **Description**  
  User must be authorized, then a new restaurant can be created by providing a name, location, and attaching an image file.

* **Required Data**

  ##### Example Header
  ```
  Content-Type: 'application/json'
  Authorization: 'Bearer <token>'
  ```

  ##### Example Body
  ```
  {
    "name":"example_name_of_restaurant",
   "location":"example_location_of_restaurant",
   "burger":"[burger._id]", //optional
   "photo_url": image
  }
  ```


* **Example Response**  
  ##### Successful
  ```
  {
    "__v": 0,
    "userID": "5967b7057cffe1001198bb95",
    "name": "Example Restaurant",
    "location": "Seattle, WA",
    "photo_url": "https://code-fellows-burger-me-bro.s3-us-west-2.amazonaws.com/a2fc9fbd60a8fda4a0988bafac505bef.png",
    "_id": "5967b7137cffe1001198bb96",
    "burger": [
        "5966a18750e9e500112e754b"
    ]
  }
 ```
##### Response Codes

  200 - successful restaurant was created  
  400 - missing or invalid body  
  500 - internal server error


  **GET** for finding a restaurant.

  **/api/restaurant/:id**  
  * **Description**  


  * **Required Data**

    ##### Example Header
    ```
    Content-Type: 'application/json'
    Authorization: 'Bearer <token>'
    ```

    ##### Example Body
    ```
    {"id": "example_id"}
    ```


 **Example Response**  
##### Successful
    {
      "__v": 0,
      "userID": "5967b7057cffe1001198bb95",
      "name": "Example Restaurant",
      "location": "Seattle, WA",
      "photo_url": "https://code-fellows-burger-me-bro.s3-us-west-2.amazonaws.com/a2fc9fbd60a8fda4a0988bafac505bef.png",
      "_id": "5967b7137cffe1001198bb96",
      "burger": [
          "5966a18750e9e500112e754b"
      ]
    }
##### Response Codes

    200 - successful restaurant returned  
    400 - missing or invalid body  
    500 - internal server error  
