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
    it('returns the first argument passed', function() {
      expect(_.identity('hello', 'world')).to.equal('hello');
    });
  });

  describe('_.values', function () {
    it('is a function', function() {
      expect(_.values).to.be.a('function');
    });
    it('returns all of the values of the passed object\'s own properties', function() {
      expect(_.values({a: 'hello', b: 'world'})).to.eql(['hello', 'world']);
      expect(_.values({a: 'hello world', b: 10})).to.eql(['hello world', 10]);
      expect(_.values({a: true, b: null})).to.eql([true, null]);
    });
    it('returns the first argument passed', function() {
      expect(_.values({a: 'hello', b: 'world'}, {a: 'again'})).to.eql(['hello', 'world']);
    });
  });

});
