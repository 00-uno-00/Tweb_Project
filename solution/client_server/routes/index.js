var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teams', function(req, res) {
  championship = req.body.championship;
  // Get teams from database
  res.json(teams);
})

module.exports = router;
