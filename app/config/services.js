module.exports = {
  "google_recaptcha": {
    "enabled": JSON.parse(process.env.RECAPTCHA_ENABLED),
    "site": process.env.RECAPTCHA_SITE,
    "secret": process.env.RECAPTCHA_SECRET
  }
}