

function getDate() {
  var moment = require('moment');

  require('moment-timezone');

  moment.tz.setDefault("Asia/Seoul");
  var date = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log("util : " + date);
  return date;
}


module.exports = getDate;
