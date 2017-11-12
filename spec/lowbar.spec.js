const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('lowbar', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('_.identity', function () {
    it('is a function', function() {
      expect(_.identity).to.be.a('function');
    });
  });
});
