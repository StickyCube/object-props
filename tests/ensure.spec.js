'use strict';

var expect = require('chai').expect;
var ensure;

describe('ensure', function () {
  var
    foo,
    actual,
    expected;

  afterEach(function () {
    actual = expected = undefined;
  });

  describe('Sanity checks', function () {

    before(function () {
      ensure = require('../index').ensure;
    });

    it('Should return the default if context is undefined', function () {
      foo = undefined;

      actual = ensure(foo, 123);
      expected = 123;

      expect(actual).to.equal(expected);
    });

    it('Should return the default if context is undefined', function () {
      foo = null;

      actual = ensure(foo, 123);
      expected = 123;

      expect(actual).to.equal(expected);
    });

    it('Should throw when a property is specified and context is undefined', function () {
      foo = undefined;

      expect(function () {
        ensure(foo, 'bar', 123);
      }).to.throw();
    });

    it('Should throw when a property is specified and context is null', function () {
      foo = null;

      expect(function () {
        ensure(foo, 'bar', 123);
      }).to.throw();
    });
  });

  describe('Single properties', function () {

    before(function () {
      foo = {
        zerobar: 0,
        numbar: 123,
        emptybar: '',
        stringbar: 'abc',
        truebar: true,
        falsebar: false,
        nullbar: null,
        undefinedbar: undefined,
        objectbar: {},
        arraybar: []
      };

      ensure = require('../index').ensure;
    });

    it('Should ignore a falsy number', function () {
      ensure(foo, 'zerobar', 999);

      actual = foo.zerobar;
      expected = 0;

      expect(actual).to.equal(expected);
    });

    it('Should ignore a truthy number', function () {
      ensure(foo, 'zerobar', 999);

      actual = foo.numbar;
      expected = 123;

      expect(actual).to.equal(expected);
    });

    it('Should ignore a falsy string', function () {
      ensure(foo, 'emptybar', 999);

      actual = foo.emptybar;
      expected = '';

      expect(actual).to.equal(expected);
    });

    it('Should ignore a truthy string', function () {
      ensure(foo, 'stringbar', 999);

      actual = foo.stringbar;
      expected = 'abc';

      expect(actual).to.equal(expected);
    });

    it('Should ignore a falsy bool', function () {
      ensure(foo, 'falsebar', 999);

      actual = foo.falsebar;
      expected = false;

      expect(actual).to.equal(expected);
    });

    it('Should ignore a truthy bool', function () {
      ensure(foo, 'truebar', 999);

      actual = foo.truebar;
      expected = true;

      expect(actual).to.equal(expected);
    });

    it('Should ignore an array', function () {
      ensure(foo, 'arraybar', 999);

      actual = foo.arraybar;
      expected = [];

      expect(actual).to.deep.equal(expected);
    });

    it('Should ignore an object', function () {
      ensure(foo, 'objectbar', 999);

      actual = foo.objectbar;
      expected = {};

      expect(actual).to.deep.equal(expected);
    });

    it('Should overwrite a null value', function () {
      ensure(foo, 'nullbar', 999);

      actual = foo.nullbar;
      expected = 999;

      expect(actual).to.equal(expected);
    });

    it('Should overwrite an undefined value', function () {
      ensure(foo, 'undefinedbar', 999);

      actual = foo.undefinedbar;
      expected = 999;

      expect(actual).to.equal(expected);
    });
  });
});
