const express = require('express');
const scraper = require('../misc/scraper');
const commentRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=comment&q=index';

commentRouter.get('/', function (req, res) {
    let url = baseUrl;

    if(req.query.post_id) {
        url += "&post_id=" + req.query.post_id;
    }

    scraper(url,
        function ($) {
            return $("comment").map(function () {
                let result = this.attribs;
                result.post_url = process.env.HOST + '/posts?id=' + result.post_id;
                return result;
            }).get();
        },
        function (comments) {
            res.json(comments);
        });
});


module.exports = commentRouter;