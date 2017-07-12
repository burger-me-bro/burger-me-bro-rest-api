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
  * username
  * password
  * email


* **Example Response**  
  ```
  Why is it not updating, dude?
  ```



**GET** for logging into a user account.

**/api/login**  
* **Description**

* **Required Data**

* **Example Response**
