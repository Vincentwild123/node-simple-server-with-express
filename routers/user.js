var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.end('get user');
});

router.post('/', function (req, res, next) {
  res.end('post user')
})

module.exports = router;