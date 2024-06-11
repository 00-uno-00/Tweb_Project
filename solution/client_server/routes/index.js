var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/contatti', function(req, res) {
  championship = req.body.championship;
  // Get teams from database
  res.json(teams);
  res.render('contatti', { title: 'Contatti' });
})

router.get('/stats_match.html', function(req, res) {
  res.sendFile(join(__dirname,'..','public','stats_match.html'));
})

module.exports = router;
