const express = require('express');
const scraper = require('./scraper');
const postRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index';

postRouter.get('/', function (req, res) {
    let url = baseUrl;

    if (req.query.limit) {
        url += '&limit=' + req.query.limit;
    }

    if (req.query.pid) {
        url += '&pid=' + req.query.pid;
    }

    if (req.query.tags) {
        url += '&tags=' + req.query.tags;
    }

    if (req.query.cid) {
        url += '&cid=' + req.query.cid;
    }

    if (req.query.id) {
        url += '&id=' + req.query.id;
    }

    if (req.query.deleted) {
        url += '&deleted=' + req.query.deleted;
    }

    if (req.query.last_id) {
        url += '&last_id=' + req.query.last_id;
    }

    scraper(url,
        function ($) {
            return $("post").map(function () {
                let result = this.attribs;

                result.comments_url = process.env.HOST + '/comments?post_id=' + result.id;
                result.tags = result.tags.split(" ")
                    .filter(tag => tag !== "");
                    
                result.tags.filter(function (item, pos) {
                    return result.tags.indexOf(item) == pos;
                });

                return result;
            }).get();
        },
        function (comments) {
            res.json(comments);
        });
});

module.exports = postRouter;