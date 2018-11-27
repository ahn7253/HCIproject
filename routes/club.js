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

router.post('/registeraction', function (req, res) {
  var data = {
    "cname": req.body.cname,
    "url": req.body.url,
    "school_name": req.body.school_name, 
    "description": req.body.description, 
    "1st_area": req.body.f_area, 
    "2nd_area": req.body.s_area, 
    "category": req.body.category
  }
  var Club = DB.getTable('Club');

  Club.getmaxid(function(cid){
    cid++;
    data["cid"] = cid;

    Club.insert(data,function(err,results){
      if(err)
        throw err;
      res.redirect('/club/page/'+data.url);
    })
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
