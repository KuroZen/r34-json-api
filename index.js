const scraperjs = require('scraperjs');
const express = require('express');
const app = express();

const serviceUrl = 'https://rule34.xxx/index.php?page=dapi&q=index';
process.env.PORT = process.env.PORT || 8080;
process.env.HOST = process.env.HOST || 'http://localhost:' + process.env.PORT;

const commentRouter = require('./commentRouter');
const postRouter = require('./postRouter');

app.use('/comments', commentRouter);
app.use('/posts', postRouter);

app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT + '.');
});
