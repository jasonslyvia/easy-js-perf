# easy-js-perf

A human readable wrapper of `window.performance` API

## Usage

```
$ npm install easy-js-perf
```

It works on both browser and CommonJS environment, suppose you're using Webpack:

```javascript
import Perf from 'easy-js-perf';
console.log(Perf());
```

And the output looks like:

```
{
  "domReady": 3271,
  "load": 4497,
  "domInteractive": 2420,
  "dns": 66,
  "ttfb": 578,
  "firstPaint": 3093,
  "requests": {
    "css": {
      "cnt": 2,
      "load": 3242.2650000000003
    },
    "link": {
      "cnt": 2,
      "load": 4264.080000000001
    },
    "img": {
      "cnt": 3,
      "load": 6516.655000000002
    },
    "script": {
      "cnt": 2,
      "load": 5080.160000000001
    },
    "xmlhttprequest": {
      "cnt": 1,
      "load": 334.03999999999996
    }
  }
}
```
