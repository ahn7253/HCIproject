var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('maching',{title:'maching',session:req.mysession,layout:'layouts/layout2'});
  
});

router.get('/manage', function(req, res, next) {
  res.render('matching_Manage/matchingManageMain',{title:'mymaching',session:req.mysession,layout:'layouts/layout2'});
  
});

module.exports = router;
