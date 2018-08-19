const express = require('express');
const scraper = require('../misc/scraper');
const tagRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=tags&s=list';

tagRouter.get('/', function (req, res) {
    let url = baseUrl;

    if (req.query.pid) {
        url += "&pid=" + req.query.pid;
    }

    scraper(url,
        function ($) {
            let tags = $('table[class="highlightable"] tr').map(function () {
                if (this.children.length === 3) {

                    //extract information
                    let count = $(this.children[0]).text();
                    let name = $(this.children[1]).text();
                    let types = $(this.children[2]).text().replace(" (edit)", "").split(", ");

                    return {
                        name: name,
                        types: types,
                        posts: count
                    };
                }
            }).get();

            // filter tags
            if (req.query.type) {
                tags = tags.filter(function(tag){
                    return tag.types.includes(req.query.type);
                });
            }

            if (req.query.name) {
                tags = tags.filter(function(tag){
                    return tag.name.includes(req.query.name);
                });
            }

            return tags;
        },
        function (comments) {
            res.json(comments);
        });
});

module.exports = tagRouter;