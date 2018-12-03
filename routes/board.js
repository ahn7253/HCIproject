var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('board', { title: 'board', session: req.mysession, layout: 'layouts/layout2' });
});

router.post('/writeaction', function (req, res) {
  if (req.session.user) {
    var Bbs = DB.getTable("Bbs");

    var values = {
      "uid": req.session.user.uid,
      "date": require('../utils/date')(),
      "title": req.body.title,
      "content": req.body.content,
      "author": 0,
    }


    Bbs.getmaxid(function (bid) {
      bid++;
      values["bid"] = bid;


      Bbs.insert(values, function (err, results) {
        if (err)
          throw err;
      });
    })


    res.send("<script>location.href='/';</script>");
  }
  else
    res.send("<script>alert('you must login');history.back();</script>");
});

router.get('/write', function (req, res) {
  if (req.session.user)
    res.render('board/write', { title: 'write board', session: req.mysession, layout: 'layouts/layout2' });
  else
    res.send("<script>alert('you must login');history.back();</script>");
});

router.get('/boardlist', function (req, res) {
  var page = 1;
  var Bbs = DB.getTable('Bbs');
  var data = null;
  if (req.params.p)
    page = req.params.p;


  var query = "SELECT b.bid,u.id,b.date,b.title FROM bbs AS b,user as u WHERE b.uid=u.uid ORDER BY bid desc LIMIT 10 OFFSET " + (page - 1) * 10;
  Bbs.special(query, function (err, results) {
    if (err)
      throw err;
    res.render('board/boardlist', { data: results, title: 'board list', session: req.mysession, layout: 'layouts/layout2' })
  });

  /*
    var data = [];
    data.push({
      "bid": 1,
      "title": "hello",
      "id": "id",
      "date": "2013-20-065"
    });
    data.push({
      "bid": 2,
      "title": "hello",
      "id": "id",
      "date": "2013-20-065"
    });
    res.render('board/boardlist', { data: data, title: 'board list', session: req.mysession, layout: 'layouts/layout2' })
  */
});


module.exports = router;
