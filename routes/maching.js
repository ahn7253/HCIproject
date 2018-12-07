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
  res.render('matching_Manage/matchingConfirm', { title: '매칭요청관리',matchingName:'볼링 경기도 정기전', session: req.mysession, layout: 'layouts/layout2' });

});
//==================매칭 수정
router.get('/mID/modify', function (req, res, next) {
  res.render('matching_Manage/matchingModify', { title: '매칭요청관리',matchingName:'볼링 경기도 정기전', session: req.mysession, layout: 'layouts/layout2' });

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
  if (req.session.user) {

    Club_User.select({ uid: req.session.user.uid, author: 2 }, function (err, results) {
      if (err)
        throw err;

      condition1.cid = results[0].cid

      Matching.getmaxid(function (maxid) {
        condition.mid = maxid + 1;
        condition1.mid = maxid + 1;
        Matching.insert(condition, function (err, results) {
          if (err)
            throw err;
        })
        MatchingList.insert(condition1, function (err, results) {
          if (err)
            throw err;
        })
      })

      res.redirect('/maching');
    })
  } else
    res.send("<script>alert('Invalid access');history.back();</script>");

});

module.exports = router;
