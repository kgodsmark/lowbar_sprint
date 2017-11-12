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

_.indexOf = function (array, value, isSorted = false) {
  if (array.length) {
    if (isSorted) return binarySearch(array, value);
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
};

function binarySearch(array, value) {
  let mid = Math.floor((array.length) / 2);
  if (array[mid] === value) {
    return mid;
  } else if (array[mid] < value && array.length > 1) {
    return binarySearch(array.splice(mid, array.length - 1), value);
  } else if (array[mid] > value && array.length > 1) {
    return binarySearch(array.splice(0, mid), value);
  } else return -1;
}

module.exports = _;
