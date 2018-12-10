var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{title: 'home', session:req.mysession});
});

router.get('/search',function(req,res){
  var kw = req.query.kw;

  var Club = DB.getTable('Club');
  var query = "SELECT cname,url,description,school_name FROM club WHERE cname LIKE '%"+kw+"%' OR school_name LIKE '%"+kw+"%' OR 1st_area LIKE '%"+kw+"%' OR 2nd_area LIKE '%"+kw+"%' OR category LIKE '%"+kw+"%'";
  
  Club.special(query,function(err,results){
    if(err)
      throw err;
     /// 여기에 작업하면됨
  });

});

module.exports = router;
