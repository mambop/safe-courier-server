# Safe Courier App
> Safe Courier is a courier service that helps users deliver parcels to different destinations.

## Tech Stack

* Node.js
* Express.js
* JSON web token (JWT)
* Bcrypt
* mongodb
* Jira


## Main Files: Project Structure
```Project Folder
     |-- middleware
         |--auth.js
     |-- models
         |--adminModel.js
         |--orderModel.js
         |--userModel.js
     |-- routers
         |--adminRoutes.js
         |--orderRoutes.js
         |--userRouter.js
     |-- index.js' ** the main driver of the app'
    
```


## Environment Variables

* PORT -- `server port number`
* DB_URL_DEV -- `database URL`
* JWT_SECRET_KEY -- `Secret key for verifying the token`


## Usage
1. `clone` this repository.
2. `cd` into project root directory.
3. run `npm install` to install all dependencies.
   (you must have [node](https://nodejs.org) installed)
4. Run `npm start` to start the server.
5. Open up `Insomnia` and then test out the Endpoints.


----
## User CRUD Operations

**Signup User**
-----------------

|        Endpoint       | Method | 
|-----------------------|--------|
| `/api/v1/auth/signup` | POST   | 

* **Request Body**
    ```json
        {
            "email"    : "phillip",
            "password"    : "123",
        }

**Login User**
-----------------

|        Endpoint       | Method | 
|-----------------------|--------|
| `/api/v1/auth/login`  | POST   |   

* **Request Body**
    ```json
        {
               "email"    : "phillip",
            "password"    : "123",
        }
    ```  
    
**Logout User**
-----------------

|        Endpoint       | Method | 
|-----------------------|--------|
| `/api/v1/auth/logout` | GET    |   

**loggedin User**
-----------------

|        Endpoint        | Method  | 
|----------------------- |---------|
| `/api/v1/auth/loggedin`|  GET    | 


**Get all Orders**
-----------------

|        Endpoint       | Method | 
|-----------------------|--------|
| `/api/v1/orders/`     | GET    |   


**Get Specific Order**
-----------------------

|        Endpoint                 | Method | 
|---------------------------------|--------|
| `/api/v1/users/:orderId/orders` |  GET   |   

**Get all orders for one user**
--------------------------------

|        Endpoint                | Method | 
|------------------------------- |--------|
| `/api/v1/users/:userId/orders` |  GET   | 

**Cancel Order**
----------------

|        Endpoint                | Method | 
|--------------------------------|--------|
| `/api/v1/orders/cancel/:id`    | DELETE | 


*Create Order**
-----------------

|        Endpoint       | Method | 
|-----------------------|--------|
| `/api/v1/orders/`     | POST   |   

* **Request Body**
    ```json
        {
            "createdBy"    : "3453234",
            "name"    : "dan",
            "contact"    : "256",
            "order"    : "drone",
            "pickup"    : "pickup",
            "destination"    : "kampala",
        }
    ```  
*change destinationr**
-----------------------

|        Endpoint             | Method | 
|-----------------------------|--------|
| `/api/v1/orders/destination` |  PUT   |   

* **Request Body**
    ```json
        {
            "Destination"    : "Nairobi",
            "id"    : "orderId",
        }
    ```  

**Login Admin**
-----------------

|        Endpoint            | Method | 
|----------------------------|--------|
| `/api/v1/admin/adminLogin` |  POST  | 

* **Request Body**
    ```json
        {
            "email"    : "admin@gmail.com",
            "password"    : "123",
        }

*change present Location**
---------------------------

|        Endpoint             | Method | 
|-----------------------------|--------|
| `/api/v1/orders/presentLoc` |  PUT   |   

* **Request Body**
    ```json
        {
            "presentLoc"    : "Kenya",
            "id"    : "orderId",
        }
    ```  

*change status**
---------------------------

|        Endpoint             | Method | 
|-----------------------------|--------|
| `/api/v1/orders/status`     |  PUT   |   

* **Request Body**
    ```json
        {
            "status" : "In Transit",
            "id"     : "orderId",
        }
    ```  
## Remarks
Project still under build 