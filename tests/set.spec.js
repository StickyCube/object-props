'use strict';

var
  set = require('../index').set,
  expect = require('chai').expect;

describe('set', function () {
  var
    foo,
    returned,
    actual,
    expected;

  describe('Sanity checks', function () {
    it('Should not throw when an undefined context is passed', function () {
      expect(function () {
        actual = set(undefined, 'bar', 123);
      }).not.to.throw();
    });

    it('Should return an object with the correct property set if undefined is passed as the context', function () {
      expected = { bar: 123 };
      actual = set(undefined, 'bar', 123);
      expect(actual).to.deep.equal(expected);
    });

    it('Should not throw when a null context is passed', function () {
      expect(function () {
        set(null, 'bar', 123);
      }).not.to.throw();
    });

    it('Should return an object with the correct property set if null is passed as the context', function () {
      expected = { bar: 123 };
      actual = set(null, 'bar', 123);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('Single properties', function () {

    beforeEach(function () {
      foo = {
        zerobar: 0,
        numbar: 123,
        emptybar: '',
        stringbar: 'abc',
        falsebar: false,
        truebar: true,
        arraybar: [],
        objectbar: {},
        nullbar: null,
        undefinedbar: undefined
      };
    });

    it('Should set a falsy number', function () {
      set(foo, 'zerobar', 999);
      actual = foo.zerobar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set a truthy number', function () {
      set(foo, 'numbar', 999);
      actual = foo.numbar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set a falsy string', function () {
      set(foo, 'emptybar', 999);
      actual = foo.emptybar;
      expected = 999
      expect(actual).to.equal(expected);
    });

    it('Should set a truthy string', function () {
      set(foo, 'stringbar', 999);
      actual = foo.stringbar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set a truthy boolean', function () {
      set(foo, 'truebar', 999);
      actual = foo.truebar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set a falsy boolean', function () {
      set(foo, 'falsebar', 999);
      actual = foo.falsebar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set an array', function () {
      set(foo, 'arraybar', 999);
      actual = foo.arraybar;
      expected = 999;
      expect(actual).to.deep.equal(expected);
    });

    it('Should set an object', function () {
      set(foo, 'objectbar', 999);
      actual = foo.objectbar;
      expected = 999;
      expect(actual).to.deep.equal(expected);
    });

    it('Should set an null value', function () {
      set(foo, 'nullbar', 999);
      actual = foo.nullbar;
      expected = 999;
      expect(actual).to.equal(expected);
    });

    it('Should set an undefined value', function () {
      set(foo, 'undefinedbar', 999);
      actual = foo.undefinedbar;
      expected = 999;
      expect(actual).to.equal(expected);
    });
  });

});
