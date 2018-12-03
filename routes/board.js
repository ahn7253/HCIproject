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
  if (req.query.p)
    page = req.query.p;


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

router.get('/showboard', function (req, res) {
  console.log(req.query);
  if (req.query.bid) {
    var bid = req.query.bid;
    var Bbs = DB.getTable('Bbs');
    var query = "SELECT b.title, b.content, b.date, u.id FROM bbs as b, user as u WHERE b.bid=u.uid AND b.bid=" + bid;

    Bbs.special(query, function (err, results) {
      if (err)
        throw err;
      res.render('board/showboard', { data: results[0], title: 'show board', session: req.mysession, layout: 'layouts/layout2' })

    });

  }
  else
    res.send("<script>alert('invalid access');history.back();</script>");



  /*
  var data = {
    "title": "hello",
    "id": "me",
    "content": "COntenkalsm",
    "date": "2013209123"
  }*/

});


module.exports = router;
