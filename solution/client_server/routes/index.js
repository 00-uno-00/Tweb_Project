const axios = require('axios');
var express = require('express');
const {join} = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/Players', function (req, res) {
  res.render('Players')
})

module.exports = router;