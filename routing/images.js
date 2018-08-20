const express = require('express');
const https = require('https');
const imageRouter = express.Router();

imageRouter.get('/', function (req, res) {
    if (!req.query.url) {
        res.sendStatus(404);
    }

    const request = https.get(req.query.url, function(response) {
        res.setHeader('Content-Type', response.headers['content-type']);
        response.pipe(res);
    });

    request.on('error', function(e){
        console.error(e);
    });
});

module.exports = imageRouter;