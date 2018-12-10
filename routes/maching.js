var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('maching', { title: 'maching', session: req.mysession, layout: 'layouts/layout2' });

});






//메칭 관리 메뉴 라우터
router.get('/manage', function (req, res, next) {
  res.render('matching_Manage/matchingManageMain', { title: 'mymaching', session: req.mysession, layout: 'layouts/layout2' });

});
//메칭 히스토리 메뉴 라우터
router.get('/history', function (req, res, next) {
  res.render('matching_Manage/history', { title: 'mymaching', session: req.mysession, layout: 'layouts/layout2' });

});

//===================나의 매칭 리스트
router.get('/myMatchingList', function (req, res, next) {
  res.render('matching_Manage/myMatchingList', { title: 'mymaching', session: req.mysession, layout: 'layouts/layout2' });

});

//=================매칭 요청 확인 페이지
router.get('/mID/confirm', function (req, res, next) {
  res.render('matching_Manage/matchingConfirm', { title: '매칭요청관리', matchingName: '볼링 경기도 정기전', session: req.mysession, layout: 'layouts/layout2' });

});
//==================매칭 수정
router.get('/mID/modify', function (req, res, next) {
  res.render('matching_Manage/matchingModify', { title: '매칭요청관리', matchingName: '볼링 경기도 정기전', session: req.mysession, layout: 'layouts/layout2' });

});
//=========================
router.post('/registeraction', function (req, res) {

  var Club_User = DB.getTable('Club_User')
  var Matching = DB.getTable('Matching')
  var MatchingList = DB.getTable('MatchingList')

  var condition = {
    mname: req.body.mname,
    content: req.body.content,
    category: req.body.category,
    "1st_area": req.body.f_area,
    "2nd_area": req.body.s_area,
    number: Number(req.body.number)
  }

  var condition1 = {
    author: 1

  }
  if (req.session.user&&req.session.user.author>0) {

    Club_User.select({ uid: req.session.user.uid, author: 2 }, function (err, results) { // get cid
      if (err)
        throw err;

      condition1.cid = results[0].cid

      Matching.getmaxid(function (maxid) { // get maxid of mid
        condition.mid = maxid + 1;
        condition1.mid = maxid + 1;
        //insert matching
        Matching.insert(condition, function (err, results) {
          if (err)
            throw err;
            
            //insert MatchingList
          MatchingList.insert(condition1, function (err, results) {
            if (err)
              throw err;
          })
        })

      })

      res.redirect('/maching');
    })
  } else
    res.send("<script>alert('Invalid access');history.back();</script>");

});

router.get('/search', function (req, res) {
  var keyword = req.query.kw;
  var query = "SELECT m.mname,m.1st_area,m.2nd_area,m.category,m.number,m.mid, ml.cid, c.cname FROM matching AS m, matching_list AS ml, club AS c WHERE (m.mname LIKE '%" + keyword + "%' OR m.content LIKE '%" + keyword + "%' OR m.category LIKE '%" + keyword + "%' OR m.1st_area LIKE '%" + keyword + "%' OR m.2nd_area LIKE '%" + keyword + "%') AND m.mid = ml.mid AND ml.author=1 AND ml.cid = c.cid";
  console.log(query);
  var Matching = DB.getTable('Matching');

  Matching.special(query, function (err, results) {
    if (err)
      throw err;
    res.send(results);
   
  })
});


router.get('/detail',function(req,res){
  var mid = Number(req.query.mid);
  var Matching = DB.getTable('Matching');
  var Club = DB.getTable('Club');
  var detail = {

  }
  Matching.select({mid:mid},function(err,results){
    if(err)
      throw err;
    detail.mname = results[0].mname;
    detail.mid = results[0].mid;
    detail.content = results[0].content;
    detail.category = results[0].category;
    detail.f_area = results[0]["1st_area"];
    detail.s_area = results[0]["2nd_area"];
    detail.number = results[0].number;

    var query = "SELECT c.cname,c.url,c.school_name FROM club AS c, matching_list AS ml WHERE ml.cid = c.cid AND ml.mid="+mid;

    Club.special(query,function(err,results){
      if(err)
        throw err;
      detail.club_list = results;

      res.send(detail);
    });

  }); 


});



router.get('/requestMaching',function(req,res){
  if(req.session.user){
    var mid = Number(req.query.mid);
    var Club_User = DB.getTable('Club_User');
    
    Club_User.select({uid:req.session.user.uid,author:2},function(err,results){
      if(err)
        throw err;
      if(results.length==0)
        res.send("동아리 회장이 아닙니다.")
      else{
        var MatchingList = DB.getTable('MatchingList');
        
        var values = {
          cid : results[0].cid,
          mid : mid,
          author:0
        }
        MatchingList.insert(values,function(err,results){
          if(err)
            throw err;
          res.redirect('/maching');
        });
      }
    });
  }
  else
    res.send("error");
  


});



module.exports = router;
