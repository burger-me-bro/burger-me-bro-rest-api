# Burger Me Bro's
REST API for Burger Me Bro's
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
    {"id": "example_id"
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

    200 - successful restaurant returned  
    400 - missing or invalid body  
    500 - internal server error  


  
