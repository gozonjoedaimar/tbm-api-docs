var express = require('express');
var router = express.Router();
var debug = require('debug')('tbmapidocs:route:login');
var reCAPTCHA = require('google-recaptcha');

var googleRecaptcha = new reCAPTCHA({
  secret: process.env.RECAPTCHA_SECRET
});

/* GET login page. */
router.get('/',function(req, res, next) {
  res.render('login', { title: "Login" });
});

router.post('/', function(req, res, next) {
  const recaptchaResponse = req.body['g-recaptcha-response'];

  googleRecaptcha.verify({response: recaptchaResponse}, function(error) {
    if (error) {
      debug(error.message);
      return res.redirect('/login/?login=error');
    }
    return res.redirect('/login/?login=success');
  });
})

module.exports = router;
