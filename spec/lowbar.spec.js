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
    it('returns the same value used in the argument', function() {
      expect(_.identity('hello world')).to.equal('hello world');
      expect(_.identity(true)).to.be.true;
      expect(_.identity(10)).to.equal(10);
      expect(_.identity(['hello world'])).to.eql(['hello world']);
      expect(_.identity({hello: 'world'})).to.eql({hello: 'world'});
      expect(_.identity()).to.equal(undefined);
      expect(_.identity(null)).to.equal(null);
    });
  });
});
