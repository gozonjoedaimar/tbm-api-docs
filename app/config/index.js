const debug = require('debug')('tbmapidocs:app/config/index');

module.exports = function(slug) {
  //
  function read(req, config = null, idx = 0, tree = ".") {
    
    tree = [tree, req[idx]].join('/');

    if (idx) {
      if (typeof req[idx] === 'undefined') {
        return config;
      }
      else {
        let cfg = config[req[idx]];

        if (typeof cfg !== 'undefined') {
          idx += 1;
          return read(req, cfg, idx, tree);
        }
        else if (config) {
          return config;
        }
        else {
          debug('[1] config not found @', tree);
          return null;
        }
      }
    }
    else {
      const cfg_path = "./"+req[idx];
      try {
        config = require(cfg_path);
        idx += 1;
        return read(req, config, idx, tree);
      }
      catch(e) {
        debug('[0] config not found @', cfg_path);
        return null;
      }
    }
  }

  if (typeof slug === 'string') {
    let info = slug.split('/');
    return read(info);
  }
  else {
    return null;
  }
}