var express = require('express');
var router = express.Router();
router.get('/cookie', function (req, res) {
  userObject = JSON.stringify({ name: 'abc', age: '24', city: 'hyderabad' });
  console.log(userObject);
  res.cookie('userObject', userObject);
  res.send(`cookie with name userObject and value ${userObject} is set`);
});
router.get('/', function (req, res) {
  res.send(JSON.parse(req.cookies.userObject));
});
module.exports = router;
