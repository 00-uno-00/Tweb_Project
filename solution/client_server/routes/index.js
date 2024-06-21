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

router.get('/Teams', function (req, res) {
  res.render('Teams')
})

router.get('/Matches', function (req, res) {
  res.render('Matches')
})

router.get('/Championships', function (req, res) {
  res.render('Championships')
})

router.get('/Chat', function (req, res) {
  res.render('Chat')
})

router.get('/Info', function (req, res) {
  res.render('Info')
})

module.exports = router;