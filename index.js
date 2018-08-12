// r34-json-api

// require packages
const scraperjs = require('scraperjs');
const express = require('express');

// setup
const app = express();
const serviceUrl = 'https://rule34.xxx/index.php?page=dapi&q=index';
process.env.PORT = process.env.PORT || 8080;
process.env.HOST = process.env.HOST || 'http://localhost:' + process.env.PORT;

// require routers
const commentRouter = require('./commentRouter');
const postRouter = require('./postRouter');

// assign routers
app.use('/comments', commentRouter);
app.use('/posts', postRouter);

app.use('/c', commentRouter);
app.use('/p', postRouter);

// start server
app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT + '.');
});
