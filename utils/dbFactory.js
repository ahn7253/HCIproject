
var init = function(){
global.DB = require('./db').getInstace(); //만약 DB가 있다면 주석처리 제거해도 됩니다. 

DB.makeTable("User","user","uid") //만약 DB가 있다면 주석처리 제거해도 됩니다.
DB.makeTable("Club","club","cid")
DB.makeTable("Club_User","club_user","cid,uid")
DB.makeTable("Bbs","bbs","bid")
DB.makeTable("Matching","matching","mid")
DB.makeTable("MatchingList","matching_list","mid,cid")
}

exports.init = init;