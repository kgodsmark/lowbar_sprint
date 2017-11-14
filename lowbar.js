const _ = {};


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

_.each = function (list, iteratee) {
  if (!iteratee) return TypeError;
  if (typeof list === 'object') list = _.values(list);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
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

function binarySearch(array, value, start, end) {
  start = start || 0;
  end = end || array.length;
  let index = Math.floor((start + end) / 2);
  if (start > end || start === end || end < start) return -1;

  if (value === array[index]) {
    return index;
  } else if (value < array[index]) {
    return binarySearch(array, value, start, index - 1);
  } else if (value > array[index]) {
    return binarySearch(array, value, index + 1, end);
  }
}

_.filter = function (list, predicate) {
  if (!predicate) return list;
  const filteredList = [];
  _.each(list, (item) => {
    if (predicate(item)) filteredList.push(item);
  });
  return filteredList;
};

_.reject = function (list, predicate) {
  if (!predicate) return [];
  const filteredList = [];
  _.each(list, (item) => {
    if (!predicate(item)) filteredList.push(item);
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

_.map = function (list, iteratee) {
  const mappedList = [];
  _.each(list, (item) => {
    mappedList.push(iteratee(item));
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

_.reduce = function (list, iteratee, memo) {
  _.each(list, (item, i, list) => {
    if (memo === undefined) {
      memo = item;
    } else memo = iteratee(memo, item, i, list);
  });
  return memo;
};

_.every = function (list, predicate) {
  if (!predicate) return true;
  if (typeof list === 'object') list = _.values(list);
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      if (!predicate(list[i])) {
        return false;
      }
    }
  }
  return true;
};

_.some = function () {
};

module.exports = _;
