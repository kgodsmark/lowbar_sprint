const _ = {};
const binarySearch = require('./utils/binarySearch');
const binaryInsertIndex = require('./utils/binaryInsertIndex');

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

_.once = function (func) {
  let isFirstTime = true;
  return () => {
    if (isFirstTime) {
      isFirstTime = false;
      return func();
    }
  };
};

_.negate = function (func) {
  return function () {
    return !func.apply(this, arguments);
  };
};

_.shuffle = function (list = []) {
  const listArray = _.map(list);
  var locationA = 0, temp = null;
  for (let i = listArray.length - 1; i > 0; i -= 1) {
    locationA = Math.floor(Math.random() * (i + 1));
    temp = listArray[i];
    listArray[i] = listArray[locationA];
    listArray[locationA] = temp;
  }
  return listArray;
};

_.invoke = function (list = [], method, ...args) {
  return _.map(list, function (item) {
    let func = (typeof method === 'function') ? method : item[method];
    return func == null ? func : func.apply(item, args);
  });
};

_.sortBy = function (list = [], iteratee = _.identity, context = this) {
  let sortedArray = [];
  _.each(list, (item, i, list) => {
    sortedArray.push(iteratee.call(context, item, i, list));
  });
  return sortedArray.sort((a, b) => b < a);
};

_.sortedIndex = function (list = [], value, iteratee, context = this) {
  if (list.length) {
    if (typeof iteratee === 'string') {
      return binaryInsertIndex(_.map(list, item => item[iteratee]), value[iteratee]);
    } else if (typeof iteratee === 'function') {
      return binaryInsertIndex(_.map(list, item => iteratee.call(context, item)), iteratee.call(context, value));
    } else return binaryInsertIndex(list, value);
  } return 0;
};

_.flatten = function (array, shallow) {
  return _.reduce(array, (acc, item) => {
    if (shallow) return acc.concat(item);
    if (Array.isArray(item)) {
      return _.flatten(acc.concat(item));
    }
    return acc.concat(item);
  }, []);
};

_.intersection = function (...array) {
  if (Array.isArray(array[0])) {
    return _.reduce(array[0], (acc, item) => {
      if (_.every(array, (section) => {
        return _.contains(section, item);
      })) {
        acc.push(item);
      }
      return acc;
    }, []);
  } return [];
};

_.difference = function (array, ...others) {
  if (Array.isArray(array)) {
    return _.reduce(array, (acc, item) => {
      if (_.every(others, (section) => {
        return !_.contains(section, item);
      })) {
        acc.push(item);
      }
      return acc;
    }, []);
  } return [];
};
module.exports = _;
