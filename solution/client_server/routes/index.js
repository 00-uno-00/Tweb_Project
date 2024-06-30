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

router.get('/specific_Player/:id', function (req, res) {
    res.render('specific_Player', {id: req.params.id})
})

router.get('/Teams', function (req, res) {
  res.render('Teams')
})

router.get('/Team/:id', function (req, res) {
    res.render('Team', {id: req.params.id})
})

router.get('/Matches', function (req, res) {
  res.render('Matches')
})

router.get('/Championships', function (req, res) {
  res.render('Championships')
})

router.get('/specific_Championship/:id', function (req, res) {
    res.render('Championship', {id: req.params.id})
})

router.get('/chat1', function (req, res) {
  res.render('chat1')
})

router.get('/Info', function (req, res) {
  res.render('Info')
})

router.get('/Match/:id', function (req, res) {
    res.render('Match', {id: req.params.id})
})
module.exports = router;