# ok.js
> `ok.js` is a small object utility library for manipulating object properties.

## Installation
`ok.js` is available for both node.js and browser.

```
Through npm:
  npm install ok-js --save
```
```
Through bower
  bower install ok-js
```

Or [get the latest](https://github.com/StickyCube/object-props) straight from git.

#### Usage
```javascript
// in node, simply require
var ok = require('ok-js');

// in the browser, `ok` is available globally. use noconflict
// if you already have a global with the same name
window._ = ok.noconflict();
```

### Why?

does this look familiar?
```javascript
if (some && some.nested && some.nested.property) {
  doSomething();
}
```

or this:
```javascript
this.object = this.object || {};
this.object.should = this.object.should || {};
this.object.should.exist = this.object.should.exist || [];
```

or this:

```javascript
var h = ((session || {}).user || {}).name || 'Spiderman';
```

ok.js aims to remove these sorts of ugly, unreadable parts of your code with a simple api for getting, setting and testing nested object properties.

### At a glance

```javascript
// ensure
var foo = { bar: null, baz: 123 };

ok.ensure(foo, 'bar.qqq.ppp', []);

console.log(foo); // { bar: { qqq: { ppp: [] }} }

```

# TODO
* finish tests
* add property test api
* finish readme
