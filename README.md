# ok.js
> `ok.js` is a small object utility library for manipulating and testing object properties.

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

```javascript
// in node, simply require
var ok = require('ok-js');

// In the browser, `ok` is available globally.
// Use noconflict if you already have a global with the same name
window._ = ok.noconflict();
```

## What does it do?
I got sick of writing long, ugly lines of code to test and set defaults on nested object properties all the time, so i wrote this. I hope you find it useful.

ok-js aims to clean up the following situations:

```javascript
// testing nested object properties
if (some && some.nested && some.nested.property) {
  doSomething();
}

// setting defaults on nested object properties
this.object = this.object || {};
this.object.should = this.object.should || {};
this.object.should.exist = this.object.should.exist || [];

// getting a nested property
var h = ((session || {}).user || {}).name || 'Spiderman';
```

### At a glance

```javascript
var make = { it: null };

// instead of this (yuk)
make.it = make.it || {};
make.it.look = make.it.look || {};
make.is.look.nice = make.it.look.nice || true;

// do this
ok.ensure(make, 'it.look.nice', true);
```

## API

### ensure(context, [property], value)
* context type: `Object` - the target object


# TODO
* finish tests
* add property test api
* finish readme
