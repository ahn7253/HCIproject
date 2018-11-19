var express = require('express');
var router = express.Router();

/**
 * 
 * 이곳은 테스트를 위한 곳입니다.
 * 
 */
router.get('/insert', function(req, res, next) {
  
  var User = DB.getTable("User")

  var values = {
    "id":"admin",
    "pw":"1234",
    "name" : "CC",
    "school_name":"ajou university",
    "email" : "CC@ajou.ac.kr"
  }
  User.insert(values,function(err,results){
    if(err)
      throw err;
  });
  
  
    res.send("check!")
});
router.get('/select',function(req,res){
  var User = DB.getTable("User");
  var condition = {
    "id":"admin"
  }
  User.select(condition,function(err,results){
    if(err)
      throw err;
    console.dir(results);
  });
  res.send("check!")
});

module.exports = router;
