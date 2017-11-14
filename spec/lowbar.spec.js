const path = require('path');
const expect = require('chai').expect;

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('lowbar', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('_.identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('returns the same value used in the argument', function () {
      expect(_.identity('hello world')).to.equal('hello world');
      expect(_.identity(true)).to.be.true;
      expect(_.identity(10)).to.equal(10);
      expect(_.identity(['hello world'])).to.eql(['hello world']);
      expect(_.identity({ hello: 'world' })).to.eql({ hello: 'world' });
      expect(_.identity()).to.equal(undefined);
      expect(_.identity(null)).to.equal(null);
    });
    it('returns the first argument passed', function () {
      expect(_.identity('hello', 'world')).to.equal('hello');
    });
  });

  describe('_.values', function () {
    it('is a function', function () {
      expect(_.values).to.be.a('function');
    });
    it('returns all of the values of the passed object\'s own properties', function () {
      expect(_.values({ a: 'hello', b: 'world' })).to.eql(['hello', 'world']);
      expect(_.values({ a: 'hello world', b: 10 })).to.eql(['hello world', 10]);
      expect(_.values({ a: true, b: null })).to.eql([true, null]);
    });
    it('returns the first argument passed', function () {
      expect(_.values({ a: 'hello', b: 'world' }, { a: 'again' })).to.eql(['hello', 'world']);
    });
  });

  describe('_.first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });
    it('returns the first element of an array if no number passed ', function () {
      expect(_.first([5, 4, 3, 2, 1])).to.equal(5);
      expect(_.first(['a', 'b', 'c'])).to.equal('a');
      expect(_.first([['first', 'array'], ['second', 'array']])).to.eql(['first', 'array']);
      expect(_.first([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }])).to.eql({ a: 'first', b: 'object' });
    });
    it('returns the first n elements of an array of the number passed', function () {
      expect(_.first([5, 4, 3, 2, 1], 2)).to.eql([5, 4]);
      expect(_.first(['a', 'b', 'c'], 2)).to.eql(['a', 'b']);
      expect(_.first([['first', 'array'], ['second', 'array']], 1)).to.eql([['first', 'array']]);
      expect(_.first([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }], 1)).to.eql([{ a: 'first', b: 'object' }]);
    });
    it('returns an empty array if an array/string with zero passed', function () {
      expect(_.first([5, 4, 3, 2, 1], 0)).to.eql([]);
      expect(_.first(['a', 'b', 'c'], 0)).to.eql([]);
      expect(_.first([['first', 'array'], ['second', 'array']], 0)).to.eql([]);
      expect(_.first([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }], 0)).to.eql([]);
      expect(_.first('hello', 0)).to.eql([]);
    });
    it('returns the first element of a string if no number passed ', function () {
      expect(_.first('hello')).to.eql('h');
    });
    it('returns the first n elements of a string of the number passed ', function () {
      expect(_.first('hello', 3)).to.eql(['h', 'e', 'l']);
    });
    it('doesn\'t work with objects and numbers', function () {
      expect(_.first({ a: 'hi', b: 'again' }, 1)).to.eql([]);
      expect(_.first({ a: 'hi', b: 'again' })).to.equal(undefined);
      expect(_.first(2, 1)).to.eql([]);
      expect(_.first(2)).to.equal(undefined);
    });
  });

  describe('_.last', function () {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });
    it('returns the last element of an array if no number passed ', function () {
      expect(_.last([5, 4, 3, 2, 1])).to.equal(1);
      expect(_.last(['a', 'b', 'c'])).to.equal('c');
      expect(_.last([['first', 'array'], ['second', 'array']])).to.eql(['second', 'array']);
      expect(_.last([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }])).to.eql({ a: 'second', b: 'object' });
    });
    it('returns the last elements of an array of the number passed ', function () {
      expect(_.last([5, 4, 3, 2, 1], 2)).to.eql([2, 1]);
      expect(_.last(['a', 'b', 'c'], 2)).to.eql(['b', 'c']);
      expect(_.last([['first', 'array'], ['second', 'array']], 1)).to.eql([['second', 'array']]);
      expect(_.last([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }], 1)).to.eql([{ a: 'second', b: 'object' }]);
    });
    it('returns an empty array if an array/string with zero passed', function () {
      expect(_.last([5, 4, 3, 2, 1], 0)).to.eql([]);
      expect(_.last(['a', 'b', 'c'], 0)).to.eql([]);
      expect(_.last([['first', 'array'], ['second', 'array']], 0)).to.eql([]);
      expect(_.last([{ a: 'first', b: 'object' }, { a: 'second', b: 'object' }], 0)).to.eql([]);
      expect(_.last('hello', 0)).to.eql([]);
    });
    it('returns the last element of a string if no number passed ', function () {
      expect(_.last('hello')).to.eql('o');
    });
    it('returns the last n elements of a string of the number passed ', function () {
      expect(_.last('hello', 3)).to.eql(['l', 'l', 'o']);
    });
    it('doesn\'t work with objects and numbers', function () {
      expect(_.last({ a: 'hi', b: 'again' }, 1)).to.eql([]);
      expect(_.last({ a: 'hi', b: 'again' })).to.equal(undefined);
      expect(_.last(2, 1)).to.eql([]);
      expect(_.last(2)).to.equal(undefined);
    });
  });

  describe('_.each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });
    it('performs the iteratee action on each element in an array list', function () {
      let count = 0;
      const counter = () => count++;
      _.each([1, 2, 3], counter);
      expect(count).to.equal(3);
    });
    it('performs the iteratee action on each element in an object list', function () {
      let count = 0;
      const counter = () => count++;
      _.each({ a: 1, b: 2, c: 3 }, counter);
      expect(count).to.equal(3);
    });
    it('performs the iteratee action on each element in a string', function () {
      let count = 0;
      const counter = () => count++;
      _.each('hello', counter);
      expect(count).to.equal(5);
    });
    it('returns the list for invalid number or boolean', function () {
      const counter = function () {};
      expect(_.each(5, counter)).to.equal(5);
      expect(_.each(true, counter)).to.equal(true);
    });
    it('requires an iteratee to pass', function () {
      expect(_.each([1, 2, 3])).to.equal(TypeError);
    });
  });

  describe('_.indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns the index at which the value can be found in the array', function () {
      expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
    });
    it('returns -1 if not found in the array', function () {
      expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
    });
    it('using the binary search it returns the correct output', function () {
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7], 2, true)).to.equal(1);
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7], 7, true)).to.equal(6);
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7], 4, true)).to.equal(3);
      expect(_.indexOf([1, 2, 3, 4, 5, 6, 7], 10, true)).to.equal(-1);
      expect(_.indexOf([1, 2, 10, 4, 11, 6, 7], 3, true)).to.equal(-1);
      expect(_.indexOf([7, 6, 5, 4, 3, 2, 1], 7, true)).to.equal(-1);
    });
    it('returns the value found starting at the index passed', function () {
      expect(_.indexOf([1, 2, 4, 4, 5, 4], 4, 3)).to.equal(3);
      expect(_.indexOf([1, 2, 4, 4, 5, 4], 4, 4)).to.equal(5);
    });
    it('returns -1 if array argument is not eligible', function () {
      expect(_.indexOf([1, 2, 4, 4, 5, 4])).to.equal(-1);
      expect(_.indexOf(1, 2, 4, 4, 5, 4)).to.equal(-1);
      expect(_.indexOf({})).to.equal(-1);
      expect(_.indexOf({ a: 1, b: 2, c: 3 })).to.equal(-1);
      expect(_.indexOf({ a: 1, b: 2, c: 3 }, 2)).to.equal(-1);
      expect(_.indexOf(true)).to.equal(-1);
    });
  });

  describe('_.filter', function () {
    const isEven = item => item % 2 === 0;
    const isLarge = item => item > 10;
    const isE = item => item === 'e';

    it('is a function', function () {
      expect(_.filter).to.be.a('function');
    });
    it('returns an array of all the values which pass the predicate', function () {
      expect(_.filter([1, 2, 3, 4, 5, 6], isEven)).to.eql([2, 4, 6]);
      expect(_.filter({ a: 1, b: 2, c: 3 }, isEven)).to.eql([2]);
      expect(_.filter([1, 2, 3, 4, 5, 12], isLarge)).to.eql([12]);
      expect(_.filter('lemon', isE)).to.eql(['e']);
      expect(_.filter(['f', 'i', 'g'], isE)).to.eql([]);
      expect(_.filter(['p', 'e', 'o', 'p', 'l', 'e'], isE)).to.eql(['e', 'e']);
    });
    it('returns an empty array if none of the values pass the predicate', function () {
      expect(_.filter([1, 2, 3, 4, 5, 6], isLarge)).to.eql([]);
      expect(_.filter('hello', isLarge)).to.eql([]);
      expect(_.filter(true, isLarge)).to.eql([]);
      expect(_.filter('', isEven)).to.eql([]);
      expect(_.filter({}, isEven)).to.eql([]);
      expect(_.filter(9, isEven)).to.eql([]);
    });
    it('returns the original array if predicate is not present', function () {
      expect(_.filter(['h', 'h', 'p'])).to.eql(['h', 'h', 'p']);
    });
  });

  describe('_.reject', function () {
    const isEven = item => item % 2 === 0;
    const isLarge = item => item > 10;
    const isE = item => item === 'e';

    it('is a function', function () {
      expect(_.reject).to.be.a('function');
    });
    it('returns an array of all the values which don\'t pass the predicate', function () {
      expect(_.reject([1, 2, 3, 4, 5, 6], isEven)).to.eql([1, 3, 5]);
      expect(_.reject({ a: 1, b: 2, c: 3 }, isEven)).to.eql([1, 3]);
      expect(_.reject([1, 2, 3, 4, 5, 12], isLarge)).to.eql([1, 2, 3, 4, 5]);
      expect(_.reject('lemon', isE)).to.eql(['l', 'm', 'o', 'n']);
      expect(_.reject(['f', 'i', 'g'], isE)).to.eql(['f', 'i', 'g']);
      expect(_.reject(['p', 'e', 'o', 'p', 'l', 'e'], isE)).to.eql(['p', 'o', 'p', 'l']);
    });
    it('returns an empty array if none of the values pass the predicate', function () {
      expect(_.reject([20, 30, 40, 50], isLarge)).to.eql([]);
      expect(_.reject(true, isLarge)).to.eql([]);
      expect(_.reject('', isEven)).to.eql([]);
      expect(_.reject({}, isEven)).to.eql([]);
      expect(_.reject(10, isEven)).to.eql([]);
    });
    it('returns an empty array if predicate is not present', function () {
      expect(_.reject(['h', 'h', 'p'])).to.eql([]);
    });
  });

  describe('_.uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
    });
    it('returns a duplicate-free version of an array', function () {
      expect(_.uniq([1, 2, 1, 4, 1, 3])).to.eql([1, 2, 4, 3]);
      expect(_.uniq(['a', 'a', 'b', 'c', 'b'])).to.eql(['a', 'b', 'c']);
      expect(_.uniq(['hello', 'hello'])).to.eql(['hello']);
      expect(_.uniq(['hello'])).to.eql(['hello']);
      expect(_.uniq(['h', 'e', 'l', 'l'])).to.eql(['h', 'e', 'l']);
    });
    it('returns a duplicate-free version of a string', function () {
      expect(_.uniq('happy')).to.eql(['h', 'a', 'p', 'y']);
      expect(_.uniq('hello')).to.eql(['h', 'e', 'l', 'o']);
      expect(_.uniq('')).to.eql([]);
    });
    it('returns an array if arguments are invalid', function () {
      expect(_.uniq(2)).to.eql([]);
      expect(_.uniq({ a: 1, b: 1 })).to.eql([]);
    });
    it('using the isSorted argument it returns the correct output', function () {
      expect(_.uniq([1, 2, 3, 4, 5, 6, 7], true)).to.eql([1, 2, 3, 4, 5, 6, 7]);
      expect(_.uniq([1, 2, 3, 10, 10, 6, 7], false)).to.eql([1, 2, 3, 10, 6, 7]);
    });
  });

  describe('_.map', function () {
    const timesThree = num => num * 3;
    const addHI = word => 'HI ' + word;

    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('returns a new array mapping each value in the passed array/object/string through the iteratee', function () {
      expect(_.map([1, 2, 3], timesThree)).to.eql([3, 6, 9]);
      expect(_.map({ one: 1, two: 2, three: 3 }, timesThree)).to.eql([3, 6, 9]);
      expect(_.map(['chris', 'amul', 'josh'], addHI)).to.eql(['HI chris', 'HI amul', 'HI josh']);
    });
    it('using _.first method returns the first of each list item', function () {
      expect(_.map([[1, 2], [3, 4]], _.first)).to.eql([1, 3]);
    });
    it('returns an empty array if arguments are invalid', function () {
      expect(_.map(2)).to.eql([]);
      expect(_.map(true)).to.eql([]);
    });
  });

  describe('_.contains', function () {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });
    it('returns true if the value is present in the passed array/object/string', function () {
      expect(_.contains([1, 2, 3], 3)).to.be.true;
      expect(_.contains('hello', 'h')).to.be.true;
      expect(_.contains({ 1: 'h', 2: 'e', 3: 'l', 4: 'l', 5: 'o' }, 'h')).to.be.true;
    });
    it('returns false if the value is not present in the passed array/object/string', function () {
      expect(_.contains([1, 2, 3], 7)).to.be.false;
      expect(_.contains('hello', 'z')).to.be.false;
      expect(_.contains({ 1: 'h', 2: 'e', 3: 'l', 4: 'o' }, 'p')).to.be.false;
    });
    it('starts searching fromIndex', function () {
      expect(_.contains([1, 2, 3], 1, 1)).to.be.false;
      expect(_.contains('hello', 'h', 1)).to.be.false;
    });
  });

  describe('_.pluck', function () {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });
    it('returns a list of  values of passed property name', function () {
      expect(_.pluck([{ name: 'chris', age: 21 }, { name: 'amul', age: 31 }], 'name')).to.eql(['chris', 'amul']);
      expect(_.pluck([{ name: 'chris', age: 21 }, { name: 'amul', age: 31 }], 'age')).to.eql([21, 31]);
    });
    it('returns undefined if the list isn\'t an array of objects', function () {
      expect(_.pluck(['hi', 'hi'])).to.eql([undefined, undefined]);
      expect(_.pluck([1, 2, 3])).to.eql([undefined, undefined, undefined]);
    });
  });

  describe('_.reduce', function () {
    const addTogether = (acc, item) => acc + item;

    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('returns a single value by boiling down the passed list', function () {
      expect(_.reduce([1, 2, 3], addTogether, 0)).to.equal(6);
      expect(_.reduce(['a', 'b', 'c'], addTogether, '')).to.equal('abc');
    });
    it('returns a single value by boiling down the passed object list', function () {
      expect(_.reduce({ a: 1, b: 2, c: 3 }, addTogether, 0)).to.equal(6);
      expect(_.reduce({ a: 'a', b: 'b', c: 'c' }, addTogether, '')).to.equal('abc');
    });
    it('returns the list passed if just a string', function () {
      expect(_.reduce('abbccd', addTogether), '').to.equal('abbccd');
    });
    it('works without an accumulator specified', function () {
      expect(_.reduce([1, 2, 3], addTogether)).to.equal(6);
      expect(_.reduce(['a', 'b', 'c'], addTogether)).to.equal('abc');
    });
  });

  describe('_.every', function () {
    const isEven = num => num % 2 === 0;

    it('is a function', function () {
      expect(_.every).to.be.a('function');
    });
    it('returns true if all of the values in the list pass the predicate', function () {
      expect(_.every([2, 4, 6], isEven)).to.be.true;
      expect(_.every({a: 2, b: 4, c: 6}, isEven)).to.be.true;
    });
    it('returns false if any of the values in the list don\'t pass the predicate', function () {
      expect(_.every([2, 4, 5], isEven)).to.be.false;
      expect(_.every({a: 2, b: 4, c: 5}, isEven)).to.be.false;
    });
    it('stops traversing the list if a false element is found', function () {
      let count = 0;
      const isEvenCount = num => {
        count++;
        return num % 2 === 0;
      };
      _.every([2, 5, 4], isEvenCount);
      expect(count).to.equal(2);
    });
    it('returns false if empty predicate', function () {
      expect(_.every([2, 4, 5], function (){})).to.be.false;
    });
    it('returns true if no predicate argument', function () {
      expect(_.every([2, 4, 5])).to.be.true;
    });
  });

  describe('_.some', function () {
    const isEven = num => num % 2 === 0;

    it('is a function', function () {
      expect(_.some).to.be.a('function');
    });
    it('returns true if any of the values in the list pass the predicate', function () {
      expect(_.some([2, 4, 5], isEven)).to.be.true;
      expect(_.some({a: 2, b: 4, c: 5}, isEven)).to.be.true;
    });
  });

});
