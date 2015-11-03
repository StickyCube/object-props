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

#### ensure(context, [path], value)
Ensure a property exists at a given `path` within a given `context`. If the resolved value is either null or undefined then the given `value` will be set. If the given context is null or undefined, ensure will return a new object with this property set.

- arguments
  * `context`:`Object` - The context in which to ensure the property exists.
  * `path`:`String` - An optional path to a property. To target nested properties, delimit with `'.'`.
  * `value`:`Any` - the value to set.


- returns the given `context` or a new Object if context was null or undefined.


#### get(context, path, [default])
Get the property specified by `path` within the given `context`. If specified, the default will be returned only when get yields null or undefined.

- arguments
  * `context`:`Object` - The context in which to find the property.
  * `path`:`String` - The path to a property. To target nested properties, delimit with `'.'`.
  * `default`:`Any` - An optional value to return when get yields null or undefined.

- returns the resolved property or default value.

#### set(context, path, value)
Set the property specified by `path` within the given `context` to `value`. If context is null or undefined, this will return a new object.

- arguments
  * `context`:`Object` - The context in which to set the property.
  * `path`:`String` - The path to a property. To target nested properties, delimit with `'.'`.
  * `value`:`Any` - The value to set.

- returns the given `context` or a new Object if context was null or undefined.


#### check(context, [path])
Get an Assertion object which can be used to test the resolved property.

Inspired by chaijs, the assertion supports `.is` and `.not` in conjunction with the following complete list of endpoints:

```javascript
  var it = check(foo, 'bar.baz');

    // each of the following return a boolean

    it.is.truthy();
    it.is.falsy();

    // using typeof operator
    it.is.typeof('string');
    // same as typeof but distinguises null and array
    it.is.kindof('array');

    it.equals(123);
    it.is.gt(Infinity);
    it.is.gte(9000);
    it.is.lt(0);
    it.is.lte(567);

    // !== undefined
    it.is.defined;
    // !== null
    it.is.null;
    // === undefined
    it.is.undefined;
    // != null
    it.is.value;
```

# TODO
* finish tests
* finish readme
