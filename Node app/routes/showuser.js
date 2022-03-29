var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');

router.get('/', function (req, res) {
  console.log(req.session['isloggedin']);
  if ((req.session['isloggedin'] = 1 && req.session['username'])) {
    let username = req.session['username'];
    const sql = `SELECT * FROM users WHERE username = "${username}"`;
    connector.query(sql, function (err, results) {
      if (err) {
        res.json({ err });
      } else {
        res.json({ results });
      }
    });
  } else {
    res.json('not loggedIn');
  }
});
module.exports = router;
