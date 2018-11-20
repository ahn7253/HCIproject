var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/loginaction', function(req, res, next) {
    var condition = {
        "id":req.body.id,
        "pw":req.body.pw
    }
    var fromURL = req.body.url;
    var User = DB.getTable("User");

    User.select(condition,function(err,results){
        if(err){
            res.send("<script>alert('DBERROR!');history.back();</script>");
            return;
        }
        if(results.len==1){
            req.session.user = results[0];
            res.send("<script>location.href='"+fromURL+"';</script>");
        }else{
            res.send("<script>alert('not valid!');history.back();</script>");
            return;
        }
        
    });

  
});

router.get('/getsession',function(req,res){
    if(req.session.user){
        
        var session = {
            "id":req.session.user.id,
            "name":req.session.user.name
        }
        res.send(session);
    }else
    res.send("none");
});

module.exports = router;