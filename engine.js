(function (root) {
  'use strict';
  var KM = { '5k': 5, '10k': 10, '10mi': 16.09344, half: 21.0975, full: 42.195 };
  var NAMES = { '5k': '5K', '10k': '10K', '10mi': '10 miles', half: 'Half marathon', full: 'Marathon' };
  var MI = 1.609344, RIEGEL = 1.06; // Riegel 1981, American Scientist
  function predict(t1, d1, d2, e) { return t1 * Math.pow(d2 / d1, e == null ? RIEGEL : e); }
  function parse(str) { // "h:mm:ss", "mm:ss" or plain seconds -> seconds, null if invalid
    if (typeof str === 'number') return str > 0 ? str : null;
    var p = String(str).trim().split(':'); if (p.length < 1 || p.length > 3) return null;
    var v = 0; for (var i = 0; i < p.length; i++) { if (!/^\d+(\.\d+)?$/.test(p[i])) return null; v = v * 60 + parseFloat(p[i]); }
    return v > 0 ? v : null;
  }
  function fmt(sec) { var n = Math.round(sec), h = Math.floor(n / 3600), m = Math.floor(n % 3600 / 60), s = n % 60, pad = function (x) { return (x < 10 ? '0' : '') + x; }; return h > 0 ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s); }
  function pace(sec, km, perMile) { return sec / (perMile ? km / MI : km); }
  var api = { KM: KM, NAMES: NAMES, MI: MI, RIEGEL: RIEGEL, predict: predict, parse: parse, fmt: fmt, pace: pace };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Race = api;
})(typeof window !== 'undefined' ? window : this);
