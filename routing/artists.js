const express = require('express');
const scraper = require('../misc/scraper');
const artistRouter = express.Router();

const baseUrl = 'https://rule34.xxx/index.php?page=artist&s=show';

artistRouter.get('/', function (req, res) {
    let url = baseUrl;

    if (req.query.id) {
        url += "&id=" + req.query.id;
    }

    scraper(url,
        function ($) {
            let artist = {};

            artist.name = $('div[id="artist"] h3').text().replace("Artist: ", "");

            artist.urls = $("#artist a").map(function() {
                return this.attribs.href;
            }).get();

            artist.posts = process.env.HOST + "/posts?tags=" + artist.name;

            return artist;
        },
        function (artist) {
            res.json(artist);
        });
});


module.exports = artistRouter;