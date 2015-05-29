module.exports = {
  sendConfirmationMail: function(req, res) {
    var userInfo =  req.body;
    res.send(userInfo);
  }
}