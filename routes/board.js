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
  res.render('board/write', { title: 'write board', session: req.mysession, layout: 'layouts/layout2' });

});



module.exports = router;
