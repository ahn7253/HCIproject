var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('group',{title:'group',session:req.mysession, layout:'layouts/layout2'});
});

module.exports = router;
