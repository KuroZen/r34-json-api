const express = require('express');
const scraper = require('../misc/scraper');
const postRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index';

postRouter.get('/', function (req, res) {
    let url = getUrl(req);

    scraper(url,
        function ($) {
            return $("post").map(function () {
                let result = this.attribs;

                // get comments url
                result.comments_url = process.env.HOST + '/comments?post_id=' + result.id;

                // convert tags
                result.tags = result.tags.split(" ")
                    .filter(tag => tag !== "");
                result.tags.filter(function (item, pos) {
                    return result.tags.indexOf(item) == pos;
                });

                // get type
                if(result.file_url.endsWith(".webm") || result.file_url.endsWith(".mp4")) {
                    result.type = "video";
                } else {
                    result.type = "image";
                }

                //modify urls
                result.file_url = process.env.HOST + "/images?url=" + result.file_url;
                result.preview_url = process.env.HOST + "/images?url=" + result.preview_url;
                result.sample_url = process.env.HOST + "/images?url=" + result.sample_url;
                result.creator_url = "https://rule34.xxx/index.php?page=account&s=profile&id=" + result.creator_id;

                return result;
            }).get();
        },
        function (comments) {
            res.json(comments);
        });
});

function getUrl(req){
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

    return url;
}

module.exports = postRouter;