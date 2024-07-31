const path = require("path");
const reCAPTCHA = require("google-recaptcha");
const debug = require("debug")("tbmapidocs:route:login");

function index(req, res) {
  let flash = req.flash("info");
  flash = flash.length > 0 ? flash[0] : "[]";
  try {
    flash = JSON.parse(flash);
  } catch (e) {
    debug(e.message);
  }
  res.render("login", { title: "Login", notif: flash });
}

function store(req, res) {
  const recaptchaResponse = req.body["g-recaptcha-response"];

  if (!__config("services/google_recaptcha/enabled")) {
    verify(req, res);
    return;
  }

  const googleRecaptcha = new reCAPTCHA({
    secret: __config("services/google_recaptcha/secret"),
  });

  googleRecaptcha.verify({ response: recaptchaResponse }, (error) => {
    if (__config("services/google_recaptcha/enabled") && error) {
      debug(error.message);
      req.flash(
        "info",
        JSON.stringify({ message: "reCAPTCHA error", type: "danger" }),
      );
      return res.redirect("/login");
    }
    verify(req, res);
  });
}

function verify(req, res) {
  const User = require(path.join(req.__appdir, "/app/models/Users.js"));
  // req.flash('info', JSON.stringify({message: 'reCAPTCHA SUCCESS', type: "success"}));
  // Verify user auth
  User.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user) {
        if (user.auth(req.body.password)) {
          req.flash(
            "info",
            JSON.stringify({
              message: "Logged in successfully",
              type: "success",
            }),
          );
          req.session.user = { username: req.body.username };
        } else {
          req.flash(
            "info",
            JSON.stringify({
              message: "User/Password does not match",
              type: "warning",
            }),
          );
        }
        return res.redirect("/login");
      }

      // return user not found
      req.flash(
        "info",
        JSON.stringify({ message: "User not found", type: "warning" }),
      );
      return res.redirect("/login");
    })
    .catch((err) => {
      debug(err.message);
      req.flash(
        "info",
        JSON.stringify({
          message: "There was an error on your request",
          type: "danger",
        }),
      );
    });
}

module.exports = {
  index,
  store,
};
