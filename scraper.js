const scraperjs = require('scraperjs');

module.exports = function (url, mapFnc, thenFnc) {
    scraperjs.StaticScraper.create(url)
        .scrape(mapFnc)
        .then(thenFnc);
};