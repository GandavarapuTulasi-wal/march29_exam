var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');
router.get('/createtable', function (req, res) {
  var sql =
    'CREATE TABLE users(user_id int AUTO_INCREMENT PRIMARY KEY,username varchar(25),password varchar(100),date_of_creation date)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM users ';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.post('/', function (req, res) {
  const { username, password, date_of_creation } = req.body;
  var usernameQuery = `select username FROM users WHERE username="${username}"`;
  connector.query(usernameQuery, function (err, results, fields) {
    if (err) {
      res.json({ err });
    } else {
      if (results.length > 0) {
        res.json({ status: 0, debug_data: 'username already exists' });
      } else {
        var sql = `INSERT INTO users (username, password, date_of_creation) VALUES (?,?,?)`;
        connector.query(
          sql,
          [username, password, date_of_creation],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: 'user created' });
            }
          }
        );
      }
    }
  });
});

router.delete('/:user_id', function (req, res) {
  const sql = `DELETE FROM users WHERE user_id=${parseInt(req.params.user_id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:user_id', function (req, res) {
  const { user_id } = req.params;
  const { username, password, date_of_creation } = req.body;
  var sql = `UPDATE users SET user_id=?,username=?,password=?,date_of_creation=? WHERE user_id=${req.params.user_id}`;
  connector.query(
    sql,
    [user_id, username, password, date_of_creation],
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});
router.get('/checklogin/:username/:password', function (req, res) {
  var sql = `SELECT * FROM users WHERE username = "${req.params.username}" and password = "${req.params.password}"`;
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        req.session['isloggedin'] = 1;
        req.session['username'] = req.params.username;
        res.json({ status: 1, data: `${req.params.username}` });
      } else {
        req.session['isloggedin'] = 0;
        res.json({ status: 0, data: 'incorrect login details' });
      }
    }
  });
});
module.exports = router;
