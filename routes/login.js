var express = require('express');
var router = express.Router();
var debug = require('debug')('tbmapidocs:route:login');
var reCAPTCHA = require('google-recaptcha');
const path = require('path');

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
  const User = require(path.join(req.__appdir, '/app/models/Users.js'));

  googleRecaptcha.verify({response: recaptchaResponse}, function(error) {
    if (error) {
      debug(error.message);
      req.flash('info', JSON.stringify({message: "reCAPTCHA error", type: "danger"}));
      return res.redirect('/login');
    }
    else {
      // req.flash('info', JSON.stringify({message: 'reCAPTCHA SUCCESS', type: "success"}));
      // Verify user auth
      User.findOne({ username: req.body.username }).exec().then(function(user) {
        if (user) {
          if (user.auth(req.body.password)) {
            req.flash('info', JSON.stringify({message: 'Logged in successfully', type: "success"}));
          }
          else {
            req.flash('info', JSON.stringify({message: 'User/Password does not match', type: "warning"}));
          }
          return res.redirect('/login');
        }
        else {
          req.flash('info', JSON.stringify({message: 'User not found', type: "warning"}));
        }
        return res.redirect('/login');
      })
      .catch((err) => {
        debug(err.message);
        req.flash('info', JSON.stringify({message: 'There was an error on your request', type: "danger"}));
      });
    }
  });
})

module.exports = router;
