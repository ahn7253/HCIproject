var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('club',{title:'club', layout:'layouts/layout2'});
});


module.exports = router;
