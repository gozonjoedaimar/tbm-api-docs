var express = require('express');
var router = express.Router();
var debug = require('debug')('tbmapidocs:route:login');

/* GET login page. */
router.get('/',function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  res.redirect('/login/?login=test');
})

module.exports = router;
