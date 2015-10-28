'use strict';

var expect = require('chai').expect;

describe('When the execution context looks like a browser', function () {

  before(function () {
    global.window = { ok: 123 };
    require('../index');
  });

  it('Should have set the package on the global window object', function () {
    expect(global.window.ok).to.be.defined;
    expect(global.window.ok.ensure).to.be.a('function');
    expect(global.window.ok.get).to.be.a('function');
    expect(global.window.ok.set).to.be.a('function');
    expect(global.window.ok.noconflict).to.be.a('function');
  });

  it('Should set the old object back when noconflict is invoked', function () {
    global.window._ = global.window.ok.noconflict();

    expect(global.window.ok).to.equal(123);
  });

});
