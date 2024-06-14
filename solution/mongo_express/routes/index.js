var express = require('express');
var router = express.Router();
var appController = require('../controllers/appearances');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/appearances', function(req, res, next) {
  appController.showAllAppearances()
      .then(appearances => {
        res.render('appearances', { appearances });
      })
      .catch(error => {
        console.error('Error fetching appearances:', error);
        res.status(500).send('An error occurred while fetching appearances.');
      });
});


module.exports = router;
