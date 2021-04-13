var express = require('express');
var router = express.Router();
var useUploadFile = require('../hooks/useUploadFile.js')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.end('ok');
});

router.post('/', async (req, res, next) => {
  await useUploadFile(req)
  res.end('ok')
})

module.exports = router;