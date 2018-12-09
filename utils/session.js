
var session = function(req,res,next){
  var sending;
  if(req.session.user){
    sending = {
      "id":req.session.user.id,
      "name":req.session.user.name,
      "author":req.session.user.author
    };
    sending = JSON.stringify(sending);
  }else{
    sending="none"
  }
  req.mysession = sending;
  next();
}

module.exports = session;