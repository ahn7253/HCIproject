
var init = function(){
global.DB = require('./db').getInstace(); //만약 DB가 있다면 주석처리 제거해도 됩니다. 

DB.makeTable("User","user","uid") //만약 DB가 있다면 주석처리 제거해도 됩니다.
}

exports.init = init;