var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{title: 'home', session:req.mysession});
});

router.get('/searchpage', function (req, res, next) {
  res.render('searchpage/searchpage', { title: 'searchpage', session: req.mysession, layout: 'layouts/layout2' });
});

module.exports = router;
