const express = require('express');
const imageRouter = express.Router();

imageRouter.get('/', function (req, res) {
    res.redirect(req.query.url);
});


module.exports = imageRouter;