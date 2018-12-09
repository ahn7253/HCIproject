var config = require('../config').server;

var instance = null;

var aesjs = require('aes-js');
const key = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]



var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ClubCollectorManager@gmail.com",
    pass: "hci!1234"
  }
})




function AuthEmail() {


}

AuthEmail.prototype.sendAuthMail = function (email) {

  var mailOption = {
    from: "mailOption",
    to: email,
    subject: "CC 인증메일입니다.",
    text: "http://" + config.host + ":" + config.port + "/user/authaction/" + encrypt(email)
  }

  transporter.sendMail(mailOption, function (err, info) {
    if (err)
      throw err;
    else
      console.log(info);
  });
}

AuthEmail.prototype.acceptAuthMail = function (token, callback) {
  var email = decrypt(token);
  var User = DB.getTable('User');
  var User1 = DB.getTable('User');
  console.log(email);
  var condition = {
    email: email
  }

  User.select(condition, function (err, results) {
    if (err)
      throw err;
    console.log("RESULTS")
    console.dir(results)
    if (results.length == 0)
      callback(false)
    else {
      if (results[0].author == 1)
        callback(false)
      else
        User1.update({ author: 1 }, condition, function (err, results) {
          if (err)
            throw err;
          callback(true);
        })
    }

  });
}

function encrypt(email) {
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var textBytes = aesjs.utils.utf8.toBytes(email);
  var encryptedBytes = aesCtr.encrypt(textBytes);
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  
  return encryptedHex;

}

function decrypt(cipher) {
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesjs.utils.hex.toBytes(cipher);
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
}




exports.getInstance = function () {
  if (instance == null)
    instance = new AuthEmail()
  return instance;
}