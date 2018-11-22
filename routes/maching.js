var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('maching',{title:'maching',session:req.mysession,layout:'layouts/layout2'});
  console.log("hhh"+"new"+req.test.is);
  
});

module.exports = router;
