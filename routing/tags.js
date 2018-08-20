const express = require('express');
const scraper = require('../misc/scraper');
const tagRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=tags&s=list';

tagRouter.get('/', function (req, res) {
    let url = baseUrl;

    if (req.query.name) {
        url += "&tags=" + req.query.name;
    }

    if (req.query.sort) {
        url += "&sort=" + req.query.sort;
    }

    if (req.query.order_by) {
        let translated;
        switch (req.query.order_by) {
            case "name":
                translated = "tag";
                break;
            case "posts":
                translated = "index_count";
                break;
            default:
                translated = req.query.order_by;
        }
        url += "&order_by=" + translated;
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
                tags = tags.filter(function (tag) {
                    return tag.types.includes(req.query.type);
                });
            }

            if(req.query.limit && req.query.limit < tags.length) {
                tags.length = req.query.limit;
            }

            return tags;
        },
        function (comments) {
            res.json(comments);
        });
});

module.exports = tagRouter;