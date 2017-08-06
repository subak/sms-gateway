var requirejs = require("requirejs");
module.exports = requirejs.config({
  baseUrl:     process.cwd() + '/app',
  nodeRequire: require,
  paths: {
    vendor: "../vendor"
  },
  map: {
    "*": {
      "web-socket-rx": "../vendor/web-socket-rx/index"
    }
  }
});