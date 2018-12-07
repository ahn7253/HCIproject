var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('maching', { title: 'maching', session: req.mysession, layout: 'layouts/layout2' });

});

router.get('/manage', function (req, res, next) {
  res.render('matching_Manage/matchingManageMain', { title: 'mymaching', session: req.mysession, layout: 'layouts/layout2' });

});

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

router.get('/search',function(req,res){
  var keyword = req.query.kw;
  var query = "SELECT m.mname,m.1st_area,m.2nd_area,m.category,m.number, ml.cid, c.cname FROM matching AS m, matching_list AS ml, club AS c WHERE (m.mname LIKE '%"+keyword+"%' OR m.content LIKE '%"+keyword+"%' OR m.category LIKE '%"+keyword+"%' OR m.1st_area LIKE '%"+keyword+"%' OR m.2nd_area LIKE '%"+keyword+"%') AND m.mid = ml.mid AND ml.author=1 AND ml.cid = c.cid";
  var Matching = DB.getTable('Matching');

  Matching.special(query,function(err,results){
    if(err)
      throw err;
    res.send(results);
  })
});

module.exports = router;
