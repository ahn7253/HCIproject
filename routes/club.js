var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('club', { title: 'club', session: req.mysession, layout: 'layouts/layout2' });
});

router.get('/registration', function (req, res) {
  if (req.session.user)
    res.render('club/registration', { title: 'club', session: req.mysession, layout: 'layouts/layout2' });
  else
    res.send("<script>alert('you arent in login.');history.back();</script>")
});

//page 부분 추가된 것
router.get('/page/pictureboard', function (req, res, next) {
  res.render('club/page/pictureBoard', { title: 'club', session: req.mysession, layout: 'layouts/layout2' });
});

router.get('/page/main', function (req, res, next) {
  res.render('club/page/main', { title: 'main', session: req.mysession, layout: 'layouts/layout2' });
});

router.get('/page/phoneNet', function (req, res, next) {
  res.render('club/page/phoneNet', { title: 'phoneNet', session: req.mysession, layout: 'layouts/layout2' });
});

router.get('/page/clubBoard', function (req, res, next) {
  res.render('club/page/clubBoard', { title: 'clubBoard', session: req.mysession, layout: 'layouts/layout2' });
});


router.post('/registeraction', function (req, res) {
  var dataClub = {
    "cname": req.body.cname,
    "url": req.body.url,
    "school_name": req.body.school_name, 
    "description": req.body.description, 
    "1st_area": req.body.f_area, 
    "2nd_area": req.body.s_area, 
    "category": req.body.category
  }
  var Club = DB.getTable('Club');
  var User = DB.getTable('User');
  var Club_User = DB.getTable('Club_User');
  var data_club_user= {
    "author":2,
    "uid":req.session.user.uid
  }
  Club.getmaxid(function(cid){
    cid++;
    dataClub["cid"] = cid;
    data_club_user["cid"] = cid;

    //make club column.
    Club.insert(dataClub,function(err,results){
      if(err)
        throw err;
      
      //insert master into club_user table.
      Club_User.insert(data_club_user,function(err,results){ 
        if(err)
          throw err;
        res.redirect('/club/page/'+dataClub.url);
      });
    });

  });
});
/**
 *  GET /club/checkdupurl/"사용자가 입력한 URL"
 * 
 *  중복되는 URL이 있는지 확인합니다
 * 
 *  있으면 "reject" 리턴
 *  없으면 "accept" 리턴
 */
router.get('/checkdupurl/:url', function (req, res) {
  var url = req.params.url;
  var condition = { "url": url };
  var Club = DB.getTable('Club');
  Club.select(condition, function (err, results) {
    if (err)
      throw err;
    if (results.length == 0) {
      res.send("accept");
    } else {
      res.send('reject');
    }
  });
});

router.get('/page/:url', function (req, res) {
  res.send(req.params.url);
});





module.exports = router;
