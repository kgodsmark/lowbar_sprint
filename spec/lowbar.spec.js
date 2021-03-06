const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('lowbar', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

  describe('_.identity', function () {
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
      const counter = function () { };
      expect(_.each(5, counter)).to.equal(5);
      expect(_.each(true, counter)).to.equal(true);
    });
    it('uses context if passed context argument', () => {
      function addItem(item) {
        this.push(item);
      }
      const newBasket = _.each(['banana', 'apple', 'kiwi'], addItem, []);
      expect(newBasket.length).to.equal(3);
    });
  });

  describe('_.indexOf', function () {
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
    it('uses context if passed context argument', () => {
      function isLessThan(num) {
        return num < this;
      }
      const result = _.filter([1, 2, 3, 4, 5, 6], isLessThan, 3);
      expect(result).to.eql([1, 2]);
    });
  });

  describe('_.reject', function () {
    const isEven = item => item % 2 === 0;
    const isLarge = item => item > 10;
    const isE = item => item === 'e';

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
    it('uses context if passed context argument', () => {
      function isLessThan(num) {
        return num < this;
      }
      const result = _.reject([1, 2, 3, 4, 5, 6], isLessThan, 3);
      expect(result).to.eql([3, 4, 5, 6]);
    });
  });

  describe('_.uniq', function () {
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
    it('uses context if passed context argument', () => {
      function addTo(item) {
        return item + this;
      }
      const result = _.map([1, 2, 3], addTo, 3);
      expect(result).to.eql([4, 5, 6]);
    });
  });

  describe('_.contains', function () {
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
    it('uses context if passed context argument', () => {
      function addTo(acc, item) {
        return item + this;
      }
      const result = _.reduce([1, 2, 3], addTo, [], 3);
      expect(result).to.equal(6);
    });
  });

  describe('_.every', function () {
    const isEven = num => num % 2 === 0;

    it('returns true if all of the values in the list pass the predicate', function () {
      expect(_.every([2, 4, 6], isEven)).to.be.true;
      expect(_.every({ a: 2, b: 4, c: 6 }, isEven)).to.be.true;
    });
    it('returns false if not all of the values in the list pass the predicate', function () {
      expect(_.every([2, 4, 5], isEven)).to.be.false;
      expect(_.every({ a: 2, b: 4, c: 5 }, isEven)).to.be.false;
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
      expect(_.every([2, 4, 5], function () { })).to.be.false;
    });
    it('returns true if no predicate argument', function () {
      expect(_.every([2, 4, 5])).to.be.true;
    });
    it('uses context if passed context argument', () => {
      function isGreaterThan(num) {
        return num > this;
      }
      const resultA = _.every([2, 4, 5], isGreaterThan, 3);
      expect(resultA).to.equal(false);
      const resultB = _.every([2, 4, 5], isGreaterThan, 1);
      expect(resultB).to.equal(true);
      const resultC = _.every({ a: 2, b: 4, c: 5 }, isGreaterThan, 1);
      expect(resultC).to.equal(true);
    });
  });

  describe('_.some', function () {
    const isEven = num => num % 2 === 0;

    it('returns true if any of the values in the list pass the predicate', function () {
      expect(_.some([2, 4, 5], isEven)).to.be.true;
      expect(_.some({ a: 2, b: 4, c: 5 }, isEven)).to.be.true;
    });
    it('returns false if no values in the list pass the predicate', function () {
      expect(_.some([1, 3, 5], isEven)).to.be.false;
      expect(_.some({ a: 1, b: 3, c: 5 }, isEven)).to.be.false;
    });
    it('stops traversing the list if a true element is found', function () {
      let count = 0;
      const isEvenCount = num => {
        count++;
        return num % 2 === 0;
      };
      _.some([2, 5, 4], isEvenCount);
      expect(count).to.equal(1);
    });
    it('returns true if no predicate argument', function () {
      expect(_.some([2, 4, 5])).to.be.true;
    });
    it('uses context if passed context argument', () => {
      function isGreaterThan(num) {
        return num > this;
      }
      const resultA = _.some([2, 4, 5], isGreaterThan, 3);
      expect(resultA).to.equal(true);
      const resultB = _.some([2, 4, 5], isGreaterThan, 6);
      expect(resultB).to.equal(false);
      const resultC = _.some({ a: 2, b: 4, c: 5 }, isGreaterThan, 3);
      expect(resultC).to.equal(true);
    });
  });

  describe('_.extends', function () {
    it('returns a shallowly copied object all of the properties from the source objects over to the destination object', function () {
      expect(_.extends({ name: 'kerry' }, { age: 21 })).to.eql({ name: 'kerry', age: 21 });
    });
    it('returns nested objects/arrays copied by reference, not duplicated.', function () {
      expect(_.extends({ name: 'kerry' }, { age: 21, skills: { a: 'analyst', b: 'programmer' } })).to.eql({ name: 'kerry', age: 21, skills: { a: 'analyst', b: 'programmer' } });
      let skillsObj = { a: 'analyst', b: 'programmer' };
      let extendedObj = _.extends({ name: 'kerry' }, { age: 21, skills: skillsObj });
      expect(extendedObj.skills === skillsObj).to.be.true;
      let skillsArr = ['analyst', 'programmer'];
      let extendedObjWIthArray = _.extends({ name: 'kerry' }, { age: 21, skills: skillsArr });
      expect(extendedObjWIthArray.skills === skillsArr).to.be.true;
    });
  });

  describe('_.defaults', function () {
    it('returns undefined properties with the first value present in the following list of defaults objects', function () {
      expect(_.defaults({ flavour: 'chocolate' }, { flavour: '', sprinkles: 'lots' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
      expect(_.defaults({ flavour: 'chocolate' }, { sprinkles: 'lots', flavour: '' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
      expect(_.defaults({ flavour: 'chocolate', sprinkles: 'lots' }, { sprinkles: 'none' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
    });
    it('returns properties with the first object values as default', function () {
      expect(_.defaults({ flavour: 'chocolate' }, { flavour: 'vanilla' })).to.eql({ flavour: 'chocolate' });
      expect(_.defaults({ flavour: 'chocolate' }, { sprinkles: 'lots', flavour: 'cherry' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
      expect(_.defaults({ flavour: 'chocolate', sprinkles: 'lots' }, { sprinkles: 'none' })).to.eql({ flavour: 'chocolate', sprinkles: 'lots' });
    });
  });

  describe('_.once', function () {
    it('it returns a function', () => {
      expect(_.once()).to.be.a('function');
    });
    it('only allows the function to be called once', function () {
      const spy = sinon.spy(console.log);
      const callOnce = _.once(spy);
      callOnce('first');
      callOnce('second');
      callOnce('third');
      expect(spy.callCount).to.eql(1);
    });
  });

  describe('_.negate', function () {
    it('returns a new negated version of the predicate', function () {
      let isFalsy = _.negate(Boolean);
      expect(isFalsy(false)).to.be.true;
      expect(isFalsy(true)).to.be.false;
    });
    it('returns the function itself if no arguments passed', () => {
      expect(_.negate()).to.be.a('function');
    });
  });

  describe('_.shuffle', function () {
    it('returns a shuffled copy of the list', function () {
      let stringTest = 'will i shuffle';
      let objTest = { a: 'hello', b: 'world' };
      expect(_.shuffle([1, 2, 3, 4, 5, 6])).to.not.eql([1, 2, 3, 4, 5, 6]);
      expect(_.shuffle(stringTest)).to.not.eql(stringTest.split());
      expect(_.shuffle(objTest)).to.not.equal(_.values(objTest));
    });
    it('returns an empty array if no list passed', () => {
      expect(_.shuffle()).to.eql([]);
      expect(_.shuffle([])).to.eql([]);
      expect(_.shuffle({})).to.eql([]);
    });
    it('does not change the original list', () => {
      let arrTest = [1, 2, 3, 4, 5, 6];
      expect(_.shuffle(arrTest)).to.not.equal(arrTest);
    });
  });

  describe('_.invoke', function () {
    it('calls the method named by methodName on each value in the list', function () {
      expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
    it('returns an empty array if no list passed', () => {
      expect(_.invoke()).to.eql([]);
      expect(_.invoke([])).to.eql([]);
      expect(_.invoke({})).to.eql([]);
    });
  });

  describe('_.sortBy', function () {
    it('returns a thoroughly sorted list after passing each item through iteratee', function () {
      const squareRt = num => Math.round(num);
      expect(_.sortBy([3.6, 1.4, 2.3], squareRt)).to.eql([1, 2, 4]);
      expect(_.sortBy({ a: 3.6, b: 1.4, c: 2.3 }, squareRt)).to.eql([1, 2, 4]);
    });
    it('uses context if passed context argument', () => {
      const addTwo = function (num) {
        return this + num;
      };
      expect(_.sortBy([1, 2, 3], addTwo, 2)).to.eql([3, 4, 5]);
    });
    it('returns an empty array if no list passed', () => {
      expect(_.sortBy()).to.eql([]);
      expect(_.sortBy([])).to.eql([]);
      expect(_.sortBy({})).to.eql([]);
    });
  });

  describe('_.zip', function () {
    it('returns the passed arrays merged into separate arrays according to their index', function () {
      expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
    it('returns undefined in place of missing array index items', () => {
      expect(_.zip(['moe', 'larry'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], [undefined, 50, false]]);
    });
  });

  describe('_.sortedIndex', function () {
    it('returns the index at which a value can be inserted into the list, maintaining order', function () {
      expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.eql(3);
      expect(_.sortedIndex([10, 20, 30, 40, 50], 25)).to.eql(2);
      expect(_.sortedIndex('abd', 'c')).to.equal(2);
      expect(_.sortedIndex([10, 20, 30, 40, 50], 55)).to.equal(5);
      expect(_.sortedIndex('bcd', 'a')).to.equal(0);
    });
    it('returns 0 if invalid list passed', function () {
      expect(_.sortedIndex({})).to.equal(0);
      expect(_.sortedIndex(1234)).to.equal(0);
      expect(_.sortedIndex()).to.equal(0);
    });
    it('a string iteratee can compute the sort ranking of each key value', function () {
      expect(_.sortedIndex([{ name: 'moe', age: 40 }, { name: 'curly', age: 60 }], { name: 'larry', age: 50 }, 'age')).to.eql(1);
    });
    it('a function iteratee can compute the sort ranking of each value', () => {
      expect(_.sortedIndex(['h', 'he', 'hel', 'hell'], 'hello', item => item.length)).to.equal(4);
    });
    //not sure how to test for context here as the above uses the length context anyway.
  });

  describe('_.flatten', function () {
    it('flattens a nested array to any depth', function () {
      expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1, 2, 3, 4]);
      expect(_.flatten([1, [2], [3, [[[[4]]]]]])).to.eql([1, 2, 3, 4]);
      expect(_.flatten(['h', ['e'], ['l', [['l']]], 'o'])).to.eql(['h', 'e', 'l', 'l', 'o']);
      expect(_.flatten(['h', { a: 'e' }, ['l', [['l']]], 'o'])).to.eql(['h', { a: 'e' }, 'l', 'l', 'o']);
    });
    it('passing shallow puts the array to only one depth', function () {
      expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql([1, 2, 3, [[4]]]);
      expect(_.flatten([1, [2], [3, [[[[4]]]]]], true)).to.eql([1, 2, 3, [[[[4]]]]]);
      expect(_.flatten([1, [2], [3, [[4]]]], false)).to.eql([1, 2, 3, 4]);
      expect(_.flatten([1, [2], [3, [[[[4]]]]]], false)).to.eql([1, 2, 3, 4]);
    });
    it('returns [] if invalid array passed', function () {
      expect(_.flatten({})).to.eql([]);
      expect(_.flatten(1234)).to.eql([]);
    });
  });

  describe('_.intersection', function () {
    it('returns the values present in each array', function () {
      expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
      expect(_.intersection(['a', 'b', 'c'], ['b', 'z'], ['b', 'c'])).to.eql(['b']);
    });
    it('returns the first array when only one argument', function () {
      expect(_.intersection([1, 2, 3])).to.eql([1, 2, 3]);
      expect(_.intersection(['a', 'b', 'c'])).to.eql(['a', 'b', 'c']);
    });
    it('returns [] if arrays not passed and array of string', function () {
      expect(_.intersection(1, 2, 3)).to.eql([]);
      expect(_.intersection({ a: 'a', b: 'b', c: 'c' }, { a: 'b', b: 'z' }, { a: 'b', b: 'c' })).to.eql([]);
      expect(_.intersection('a', 'b')).to.eql([]);
    });
  });

  describe('_.difference', function () {
    it('returns the values from the first array that are not present in the other arrays', function () {
      expect(_.difference([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([3]);
      expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
      expect(_.difference(['a', 'b', 'c'], ['b', 'z'], ['b', 'c'])).to.eql(['a']);
    });
    it('returns [] if arrays not passed and array of string', function () {
      expect(_.difference(1, 2, 3)).to.eql([]);
      expect(_.difference({ a: 'a', b: 'b', c: 'c' }, { a: 'b', b: 'z' }, { a: 'b', b: 'c' })).to.eql([]);
      expect(_.difference('a', 'b')).to.eql([]);
    });
  });

  describe('_.memoize', function () {
    it('caches the computed result of the function', function () {
      var fibonacci = _.memoize(function (n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      });
      fibonacci(4);
      expect(fibonacci.cache).to.eql({ 0: 0, 1: 1, 2: 1, 3: 2, 4: 3 });
    });
    it('returns the inner function if no function is passed', function () {
      expect(_.memoize(1, 2)).to.be.a('function');
      expect(_.memoize()).to.be.a('function');
    });
    it('if passed the same argument, only runs once and returns from the cache', () => {
      function fibonacci(n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      }
      const spy = sinon.spy(fibonacci);
      const memoizeSpy = _.memoize(spy);
      memoizeSpy(4);
      memoizeSpy(4);
      expect(spy.callCount).to.equal(1);
      expect(memoizeSpy.cache).to.eql({ '4': 3 });
    });
    it('when using a hasher, the cache keys are renamed', () => {
      function fibonacci(n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      }
      function hasher() {
        return 'A';
      }
      const spy = sinon.spy(fibonacci);
      const memoizeSpy = _.memoize(spy, hasher);
      memoizeSpy(4);
      expect(memoizeSpy.cache).to.eql({ 'A': 3 });
    });
  });

  describe('_.delay', function () {
    beforeEach(function () {   // Overwrite the global timer functions (setTimeout, setInterval) with Sinon fakes
      this.clock = sinon.useFakeTimers();
    });
    afterEach(function () {   // Restore the global timer functions to their native implementations
      this.clock.restore();
    });

    it('invokes the function after the passed waiting time', function () {
      const spy = sinon.spy(console.log);
      _.delay(spy, 2000);
      this.clock.tick(1999);
      expect(spy).to.not.be.called;
      expect(spy.callCount).to.equal(0);
      this.clock.tick(1);
      expect(spy).to.be.called;
      expect(spy.calledOnce).to.be.true;
    });
    it('invokes the function with the passed arguments after the passed waiting time', function () {
      const spy = sinon.spy(console.log);
      _.delay(spy, 2000, 'hello', 'world');
      this.clock.tick(1999);
      expect(spy).to.not.be.called;
      expect(spy.callCount).to.equal(0);
      this.clock.tick(1);
      expect(spy).to.be.called;
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly('hello', 'world')).to.be.true;
    });
  });

  describe('_.where', () => {
    it('returns an array of all the values that contain all of the key-value pairs listed in properties', () => {
      const listOfPlays = [
        {
          title: 'Cymbeline',
          author: 'Shakespeare',
          year: 1611
        },
        {
          title: 'The Tempest',
          author: 'Shakespeare',
          year: 1611
        },
        {
          title: 'another',
          author: 'Shakespeare',
          year: 1600
        },
        {
          title: 'more others',
          author: 'Another Author',
          year: 1615
        }];

      expect(_.where(listOfPlays, { author: 'Shakespeare', year: 1611 })).to.eql([{ title: 'Cymbeline', author: 'Shakespeare', year: 1611 },
      { title: 'The Tempest', author: 'Shakespeare', year: 1611 }]);
    });
  });
  
  xdescribe('_.throttle', () => {
    let clock;
    before(function () {
      clock = sinon.useFakeTimers();
    });
    after(function () {
      clock.restore();
    });

    it('returns a throttled version of the passed array, waiting for the period to pass', () => {
      const spy = sinon.spy();
      let throttled = _.throttle(spy, 100);
      throttled();
      throttled();
      throttled();
      clock.tick(99);
      expect(spy.callCount).to.equal(0);
      clock.tick(1);
      expect(spy.callCount).to.equal(1);
    });
    it('disables the leading edge call', () => {
      const spy = sinon.spy();
      let throttled = _.throttle(spy, 100, {leading: true});
      throttled();
      throttled();
      throttled();
      clock.tick(99);
      expect(spy.callCount).to.equal(0);
      clock.tick(1);
      expect(spy.callCount).to.equal(1);
      throttled();
      throttled();
      throttled();
      clock.tick(201);
      expect(spy.callCount).to.equal(2);
    });
  });

});
