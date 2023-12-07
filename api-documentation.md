# API Documentation

# Product

### 1. GET /product

Description:

- Get all product from database

<!-- Request:

- headers():

```json
{
  "access_token": "string"
}
``` -->

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Succesfully get all products",
    "statusCode": "OK",
    "response": [
        {
            "no": 1,
            "url_photo": "localhost:4001/public/1701156351489.png",
            "id": 2,
            "name": "Black",
            "price": 13000,
            "description": "Espresso, Water",
            "category": null,
            "photo": "1701156351489.png"
        },
        {
            "no": 2,
            "url_photo": "localhost:4001/public/1700996060845.png",
            "id": 1,
            "name": "Berry",
            "price": 15000,
            "description": "Espresso, Strawberry Freshmilk",
            "category": null,
            "photo": "1700996060845.png"
        },
        ...,
    ]
}
```

&nbsp;

### 2. POST /product
Description:
- Create product

Request:

- body:

```form
form-data: 

name: text
price: text
description: text
categoryId: text | null
photo: file | null
```

_Response (201 - Created)_

```json
{
    "status": true,
    "message": "Succesfully create new product",
    "statusCode": "OK",
    "response": {
        "id": 15,
        "createdAt": "2023-12-02T13:37:47.886Z",
        "updatedAt": "2023-12-02T13:37:47.886Z",
        "name": "White",
        "price": 17000,
        "description": "Espresso, Water",
        "photo": null,
        "status": true,
        "categoryId": null
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
```
&nbsp;

### 3. GET /product/:id

Description:
- Get product detail by id from data base

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "status": true,
    "message": "Succesfully get product detail",
    "statusCode": "OK",
    "response": {
        "id": 2,
        "createdAt": "2023-11-26T11:50:53.276Z",
        "updatedAt": "2023-11-28T07:25:51.499Z",
        "name": "Black",
        "price": 13000,
        "description": "Espresso, Water",
        "photo": "1701156351489.png",
        "status": true,
        "categoryId": null,
        "url_photo": "localhost:4001/public/1701156351489.png"
    }
}
```

_Response (404 - Not Found)_

```json
{
    "status": false,
    "message": "Product with id 55 not found",
    "statusCode": "FAILED"
}
```

### 4. PUT /product/:id

Description:

- Update product by id

Request:

- body:

```form
form-data: 

name: text
price: text
description: text
categoryId: text | null
photo: file | null
```
- params:
```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
    "status": true,
    "message": "Succesfully update product with id 7",
    "statusCode": "OK",
    "response": {
        "id": 7,
        "createdAt": "2023-12-02T12:17:59.880Z",
        "updatedAt": "2023-12-02T13:47:27.752Z",
        "name": "Filter Brew",
        "price": 15000,
        "description": "Arabica single origin",
        "photo": null,
        "status": true,
        "categoryId": null
    }
}
```
_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
```
_Response (404 - Not Found)_

```json
{
    "status": false,
    "message": "Product with id 55 not found",
    "statusCode": "FAILED"
}
```

### 5. PATCH /product/:id
Description:
-Change product's status by id

Request:
- params
```json
{
  "id": "integer (required)"
}
```
_Response (200 - OK)_
```json
{
    "status": true,
    "message": "Succesfully update status product with id 1",
    "statusCode": "OK",
    "response": {
        "id": 1,
        "createdAt": "2023-11-26T10:54:20.921Z",
        "updatedAt": "2023-12-02T14:15:32.064Z",
        "name": "Berry",
        "price": 15000,
        "description": "Espresso, Strawberry Freshmilk",
        "photo": "1700996060845.png",
        "status": true,
        "categoryId": null
    }
}
```
_Response (404 - Not Found)_

```json
{
    "status": false,
    "message": "Product with id 55 not found",
    "statusCode": "FAILED"
}
```

# Category

