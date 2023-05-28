var express = require('express');
var router = express.Router();
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var debug = require('debug')('tbmapidocs:route:index');

/* GET home page. */
router.get('/',function(req, res, next) {
  let index = path.resolve(req.__appdir, 'build/html/index.html');
  res.sendFile(index);
});

/** Get docs html */
router.get(/\.html$/, function(req, res, next) {
  try {
    // file path
    let file = path.join(req.__appdir, req.__docdir, req.path);
    // Check if file exists; throw error if not
    fs.accessSync(file);
    // Serve file
    res.sendFile(file);
  }
  catch(e) {
    debug("There was an error using glob");
    debug(e.message);
    next();
  }
})

/** Get docs static files */
router.get(/\.(css|woff|woff2|js|ico)$/, function(req, res, next) {
  let publicFile = path.join(req.__appdir, req.__public, req.path);
  let docFile = path.join(req.__appdir, req.__docdir, req.path);
  // check if public file exists
  fs.access(publicFile, function(err) {
    // file is not public
    if (err) {
      // check if doc file exists
      fs.access(docFile, function(err) {
        if (err) {
          // file does not exist; pass to next handler
          next();
        }
        else {
          // serve file
          res.sendFile(docFile);
        }
      })
    }
    else {
      // file exists; pass to next handler
      next();
    }
  })
});

module.exports = router;
