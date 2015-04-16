// Generated by CoffeeScript 1.8.0

/*
paras: what to log, if an object then it will be deeply inspected
 */

(function() {
  var debug,
    __slice = [].slice;

  if (typeof process === 'undefined') {
    debug = false;
  } else {
    debug = process.env['NODE_DEBUG'] ? true : false;
  }

  module.exports = function() {
    var e, file, inspect, locLine, m, msg, offsets, para, paras, path, ts, _ref;
    paras = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    ts = (function() {
      var dateTs, i, pad, sms, sts, _i;
      dateTs = new Date();
      sts = dateTs + "";
      sms = '' + dateTs.getMilliseconds();
      pad = 3 - sms.length;
      for (i = _i = 0; 0 <= pad ? _i < pad : _i > pad; i = 0 <= pad ? ++_i : --_i) {
        sms = '0' + sms;
      }
      return sts.slice(4, 24) + "." + sms + sts.slice(24, 33);
    })();
    inspect = function(obj, opt) {
      var util;
      if (typeof window === 'undefined') {
        util = require('util');
        return util.inspect(obj, opt);
      } else if (module.exports.inspect) {
        return module.exports.inspect(obj, opt);
      } else {
        return '' + obj;
      }
    };
    msg = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = paras.length; _i < _len; _i++) {
        para = paras[_i];
        _results.push(typeof para === "object" ? inspect(para, {
          depth: 10
        }) : "" + para);
      }
      return _results;
    })()).join('');
    if (debug) {
      e = new Error("");
      locLine = e.stack.split("\n")[2];
      m = /\((.*?):(\d+:\d+)\)/.exec(locLine);
      if (!m) {
        m = /at (.*?):(\d+:\d+)/.exec(locLine);
      }
      if (m) {
        _ref = [m[1], m[2]], file = _ref[0], offsets = _ref[1];
        path = require("path");
        return console.log("[" + ts + "](" + (path.relative(process.cwd(), file)) + ":" + offsets + ") " + msg + " ");
      } else {
        return console.log("[" + ts + "](" + e.stack + ") " + msg + " ");
      }
    } else {
      return console.log("[" + ts + "] " + msg + " ");
    }
  };

}).call(this);

//# sourceMappingURL=index.js.map
