var express = require('express');
var router = express.Router();

/**
 *  post /user/loginaction
 * 
 *  params : 
 *      id, pw, url(어디페이지에서 왔는지 확인하기 위해서)
 * 
 *  성공시 : 로그인시도했던 페이지로 이동
 *  실패시 : alert와 함께 이전페이지로 이동.
 * 
 */
router.post('/loginaction', function(req, res, next) {
    var condition = {
        "id":req.body.id,
        "pw":req.body.pw
    }
    console.log(condition)
    var fromURL = req.body.url;
    var User = DB.getTable("User");

    User.select(condition,function(err,results){
        if(err){
            res.send("<script>alert('DBERROR!');history.back();</script>");
            return;
        }
        console.log(results);
        console.log(results.length);
        if(results.length==1){
            req.session.user = results[0];
            res.send("<script>location.href='"+fromURL+"';</script>");
        }else{
            res.send("<script>alert('not valid!');history.back();</script>");
            return;
        }
        
    });

  
});
/**
 *  GET /user/getsession
 * 
 *  세션이 있을 시 JSON파일 전송
 *  JSON 파일 형식은
 *  {"id":"유저아이디","name":"사용자이름"}
 * 
 *  세션이 없을 시 "none"이라고 전송
 * 
 *  로그인이 되어있는지 안되어있는지 판단할 수 있습니다.
 * 
 */
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