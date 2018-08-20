const express = require('express');
const scraper = require('../misc/scraper');
const defaultRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index';

defaultRouter.get('/', function (req, res) {
    res.json({
        message: "This is a wrapper for the rule34 api. For more info see https://github.com/KuroZen/r34-json-api#readme",
        posts: process.env.HOST + "/posts",
        comments: process.env.HOST + "/comments",
        tags: process.env.HOST + "/tags",
        images: process.env.HOST + "/images",
    });
});

module.exports = defaultRouter;