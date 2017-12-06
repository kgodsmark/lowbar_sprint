const _ = {};
const binarySearch = require('./utils/binarySearch');

_.identity = function (value) {
  return value;
};

_.values = function (object) {
  let result = [];
  for (let prop in object) {
    result.push(object[prop]);
  }

  return result;
};

_.first = function (item, n) {
  if (arguments.length === 1) return item[0];
  if (n === 0 || !item.length) return [];
  if (item.length) return Array.isArray(item) ? item.slice(0, n) : item.split('').slice(0, n);
};

_.last = function (item, n) {
  if (arguments.length === 1) return item[item.length - 1];
  if (n === 0 || !item.length) return [];
  if (item.length) return Array.isArray(item) ? item.slice(-n) : item.split('').slice(-n);
};

_.each = function (list, iteratee = _.identity, context = this) {
  if (typeof list === 'object') list = _.values(list);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      iteratee.call(context, list[i], i, list);
    }
    return list;
  }
  return list;
};

_.indexOf = function (array, value, isSorted) {
  if (array.length) {
    if (isSorted === true) return binarySearch(array, value);
    let startIndex = 0;
    if (typeof isSorted === 'number') { startIndex = isSorted; }
    for (let i = startIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
};

_.filter = function (list, predicate = _.identity, context = this) {
  if (!predicate) return list;
  const filteredList = [];
  _.each(list, (item) => {
    if (predicate.call(context, item)) filteredList.push(item);
  });
  return filteredList;
};

_.reject = function (list, predicate = _.identity, context = this) {
  if (!predicate) return [];
  const filteredList = [];
  _.each(list, (item) => {
    if (!predicate.call(context, item)) filteredList.push(item);
  });
  return filteredList;
};

_.uniq = function (list, isSorted) {
  const uniqueList = [];
  if (list.length) {
    _.each(list, (item) => {
      if (_.indexOf(uniqueList, item, isSorted) === -1) {
        uniqueList.push(item);
      }
    });
  }
  return uniqueList;
};

_.map = function (list, iteratee = _.identity, context = this) {
  const mappedList = [];
  _.each(list, (item) => {
    mappedList.push(iteratee.call(context, item));
  });
  return mappedList;
};

_.contains = function (list, value, fromIndex = 0) {
  if (typeof list === 'object') list = _.values(list);
  if (_.indexOf(list.slice(fromIndex), value) >= 0) return true;
  else return false;
};

_.pluck = function (list, propertyName) {
  return _.map(list, object => object[propertyName]);
};

_.reduce = function (list, iteratee = _.identity, memo, context = this) {
  _.each(list, (item, i, list) => {
    if (memo === undefined) {
      memo = item;
    } else memo = iteratee.call(context, memo, item, i, list);
  });
  return memo;
};

_.every = function (list, predicate = _.identity, context = this) {
  if (!predicate) return true;
  if (typeof list === 'object') list = _.values(list);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      if (!predicate.call(context, list[i])) {
        return false;
      }
    }
  }
  return true;
};

_.some = function (list, predicate, context = this) {
  if (!predicate) return true;
  if (typeof list === 'object') list = _.values(list);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      if (predicate.call(context, list[i])) {
        return true;
      }
    }
  }
  return false;
};

_.extends = function (destination) {
  _.each(arguments, (object, i) => {
    for (var key in arguments[i]) {
      destination[key] = arguments[i][key];
    }
  });
  return destination;
};

_.defaults = function (destination) {
  _.each(arguments, (object, i) => {
    for (var key in arguments[i]) {
      if (destination[key] === undefined)
        destination[key] = arguments[i][key];
    }
  });
  return destination;
};

module.exports = _;
