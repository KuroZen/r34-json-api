# Rule34 Json API
This is a small web-api that implements all functionalities of the original rule34 api, but instead of xml it provides json.

The app is [hosted on heroku](https://r34-json-api.herokuapp.com) for simple access and usage.

## Posts
Posts can be accessed with ```/posts``` or ```/p```.
### Query parameters
* **limit** - Number of posts to get, capped at 100.
* **pid** - Specifies the page number.
* **tags** - Refine your search, seperate multiple tags with ```+```.
* **cid** - Change id in Unix time.
* **id** - Id of the post.

All of these are optional.
### Example
[https://r34-json-api.herokuapp.com/posts?tags=dark_skin+female](https://r34-json-api.herokuapp.com/posts?tags=dark_skin+female)

## Tags
Tags can be accessed with ```/tags``` or ```/t```.
### Query parameters
* **type** Allows you to filter tags by type.
* **name** Allows you to filter tags by name.
### Example
[https://r34-json-api.herokuapp.com/tags?type=general&name=cum](https://r34-json-api.herokuapp.com/tags?type=general&name=cum)

## Comments
Comments can be accessed with ```/comments``` or ```/c```.
### Query parameters
* **post_id** - Allows you to get all comments of a single post.
### Example
[https://r34-json-api.herokuapp.com/comments?post_id=2868605](https://r34-json-api.herokuapp.com/comments?post_id=2868605)