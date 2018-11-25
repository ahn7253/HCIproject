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
router.post('/loginaction', function (req, res, next) {
    var condition = {
        "id": req.body.id,
        "pw": req.body.pw
    }

    var fromURL = req.body.url;
    var User = DB.getTable("User");

    User.select(condition, function (err, results) {
        if (err) {
            res.send("<script>alert('DBERROR!');history.back();</script>");
            return;
        }

        if (results.length == 1) {
            req.session.user = results[0];
            res.send("<script>location.href='" + fromURL + "';</script>");
        } else {
            res.send("<script>alert('not valid!');history.back();</script>");
            return;
        }

    });


});

/**
 *  GET /user/logoutaction
 * 
 *  로그아웃을 시켜줍니다.
 * 
 *  세션정보를 삭제합니다.
 */
router.get('/logoutaction', function (req, res) {
    req.session.destroy();
    req.mysession.destroy();
    res.redirect('/');
});

/**
 *  post /user/registeraction
 * 
 *  params : 
 *      id, pw,name,school_name,email
 * 
 *  유저를 등록시켜줍니다.
 * 
 *  성공시 : 홈으로 이동.
 *  
 * 
 */
router.post('/registeraction', function (req, res) {
    var User = DB.getTable("User")

    var values = {
        "id": req.body.id,
        "pw": req.body.pw,
        "name": req.body.name,
        "school_name": req.body.school_name,
        "email": req.body.email,
        "author": 0
    }
    

    User.getmaxid(function (uid) {
        uid++;
        values["uid"] = uid;
        

        User.insert(values, function (err, results) {
            if (err)
                throw err;
        });
    })


    res.send("<script>location.href='/';</script>");
});
/**
 *  GET /user/checkdupid/"체크할 아이디"
 * 
 *  아이디 중복 확인
 * 
 *  같은 아이디가 존재할 시 : "reject" 라고 반환
 *  같은 아이디가 없을 시 : "accept" 라고 반환
 * 
 */
router.get('/checkdupid/:id',function(req,res){
    var id = req.params.id;
    var User = DB.getTable("User");
    var condition={
        "id":id
    }
    User.select(condition,function(err,results){
        if(err)
            throw err;
        if(results.length==0)
            res.send("accept");
        else
            res.send("reject");
    });
});

router.get('/registration',function(req,res){
    res.render('user/registration');
});

module.exports = router;