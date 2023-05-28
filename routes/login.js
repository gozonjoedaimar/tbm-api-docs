var express = require('express');
var router = express.Router();
var debug = require('debug')('tbmapidocs:route:login');
var reCAPTCHA = require('google-recaptcha');

var googleRecaptcha = new reCAPTCHA({
  secret: process.env.RECAPTCHA_SECRET
});

/* GET login page. */
router.get('/',function(req, res, next) {
  let flash = req.flash('info');
  flash = flash.length > 0 ? flash[0]: "[]";
  try{
    flash = JSON.parse(flash);
  }
  catch(e){
    debug(e.message);
  }
  res.render('login', { title: "Login", notif: flash });
});

router.post('/', function(req, res, next) {
  const recaptchaResponse = req.body['g-recaptcha-response'];

  googleRecaptcha.verify({response: recaptchaResponse}, function(error) {
    if (error) {
      debug(error.message);
      req.flash('info', JSON.stringify({message: "reCAPTCHA error", type: "danger"}));
    }
    else {
      req.flash('info', JSON.stringify({message: 'reCAPTCHA SUCCESS', type: "success"}));
    }
    return res.redirect('/login');
  });
})

module.exports = router;
