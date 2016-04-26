/**
 * Only use this module in browsers
 */
function Perf() {
  var perf = {};

  if (window && window.performance) {
    var timing = window.performance.timing;
    var base = timing.fetchStart;

    perf.domReady = timing.domComplete - timing.domLoading;
    perf.load = timing.loadEventStart - timing.navigationStart;
    perf.domInteractive = timing.domInteractive - timing.domLoading;
    perf.dns = timing.domainLookupEnd - timing.domainLookupStart;
    perf.ttfb = timing.responseStart - timing.connectEnd;
    perf.firstPaint = parseFloat(getFirstPaint());
    perf.requests = getRequests();
  }


  function getFirstPaint() {
    var firstPaint = 0;
    if (window.chrome && window.chrome.loadTimes) {
      // Convert to ms
      firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
      firstPaint = firstPaint - (window.chrome.loadTimes().startLoadTime*1000);
      return firstPaint.toFixed(0);
    } else if (typeof window.performance.timing.msFirstPaint === 'number') {
      firstPaint = window.performance.timing.msFirstPaint;
      firstPaint = firstPaint - window.performance.timing.navigationStart;
      return firstPaint.toFixed(0);
    }
  }


  function getRequests() {
    if (window.performance.getEntries) {
      var entries = window.performance.getEntries();
      return entries.reduce(function(prev, curr) {
        var type = unifyEntryType(curr);
        if (!prev[type]) {
          prev[type] = {
            cnt: 1,
            load: curr.duration
          };
        } else {
          prev[type] = {
            cnt: prev[type].cnt + 1,
            load: prev[type].load + curr.duration
          };
        }

        return prev;
      }, {});
    }
    return {};
  }

  function unifyEntryType(entry) {
    if (entry.initiatorType === 'link' && entry.name.match(/\.css/)) {
      return 'css';
    }

    if (entry.initiatorType === '' && entry.name.match(/\.json/)) {
      return 'json';
    }

    if (entry.initiatorType === 'css' && entry.name.match(/(jpg|png|gif|bmp)/)) {
      return 'img';
    }

    return entry.initiatorType;
  }
}

if (typeof define === 'function' && define.amd) {
  define([], Perf);
} else if (typeof module === 'object' && module.exports) {
  module.exports = exports.default = Perf;
} else {
  window.easyJsPerf = Perf;
}
