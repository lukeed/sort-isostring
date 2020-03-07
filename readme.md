# sort-isostring [![build status](https://badgen.net/github/status/lukeed/sort-isostring)](https://github.com/lukeed/sort-isostring/actions) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/sort-isostring)](https://codecov.io/gh/lukeed/sort-isostring)

> A tiny (110B) and [fast](#benchmarks) utility to sort [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) Date strings

Converting strings to `Date` instances is expensive.<br>Unless you _truly_ need a `Date` instance (or have one anyway), you're better off relying on string comparison logic.<br>Gone are wasteful days of parsing Dates just to determine a sort order.

While ISO 8601 stirngs are preferred (see [`Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)), all you _really_ need is a `YYYY-MM-DD` prefix for safe LTR character comparisons.

**Note:** Formats like `MM/DD/YYYY` and `DD-MM-YYYY` will yield incorrect results.

This module is delivered as:

* **CommonJS**: [`dist/index.js`](https://unpkg.com/sort-isostring/dist/index.js)
* **ES Module**: [`dist/index.mjs`](https://unpkg.com/sort-isostring/dist/index.mjs)
* **UMD**: [`dist/index.min.js`](https://unpkg.com/sort-isostring/dist/index.min.js)

## Install

```
$ npm install --save sort-isostring
```


## Usage

```js
import sorter from 'sort-isostring';

const articles = [
  { updated: '2019-12-01' },
  { updated: '2020-03-07T05:51:07.746Z' },
  { updated: '2018-01-07T05:50:41.107Z' },
  { updated: '2020-02-21' },
];

// Sort: Oldest first
articles.sort((x, y) => sorter(x.updated, y.updated));
console.log(articles.map(x => x.updated));
//=> [ '2018-01-07T05:50:41.107Z', '2019-12-01',
//=>   '2020-02-21', '2020-03-07T05:51:07.746Z' ]


// Sort: Newest first (aka, recency)
articles.sort((x, y) => sorter(y.updated, x.updated));
console.log(articles.map(x => x.updated));
//=> [ '2020-03-07T05:51:07.746Z', '2020-02-21',
//=>   '2019-12-01', '2018-01-07T05:50:41.107Z' ]
```


## API

### sort(foo, bar)
Returns: `Number`

As with any comparison function, when comparing `foo` and `bar`:

* A `0` is returned if the values are equal
* A `-1` is returned if `foo` is less than `bar`
* A `1` is returned if `foo` is greater than `bar`


#### foo
Type: `String`

A Date string in ISO 8601 (or similar) format.<br>See [`Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

> **Important:** The string format must be identical to `bar`'s format.

#### bar
Type: `String`

A Date string in ISO 8601 (or similar) format.<br>See [`Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

> **Important:** The string format must be identical to `foo`'s format.


## Benchmarks

> Running on Node.js v10.13.0

```
Date[] -> Number                 x    322,876 ops/sec ±0.30% (96 runs sampled)
string[].map(Date) -> Number     x    194,208 ops/sec ±0.77% (95 runs sampled)
string[] -> sort-isostring       x  1,443,499 ops/sec ±1.22% (94 runs sampled)
```

## Related

- [tinydate](https://github.com/lukeed/tinydate) - An extremely quick, tiny (349B), and reusable date formatter.


## License

MIT © [Luke Edwards](https://lukeed.com)
