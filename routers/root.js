var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.dir(req.query)
  res.cookie('name', 'value', {
    domain: '127.0.0.1',
    path: '/',
    maxAge: 365000,
  })
  res.end('index page');
});

module.exports = router;