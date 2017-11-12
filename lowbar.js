const _ = {};


_.identity = function (value) {
  return value;
};

_.values = function (object) {
  let result = [];
  for (const prop in object) {
    result.push(object[prop]);
  }

  return result;
};

_.first = function (item, n) {
  // for arrays
  if (Array.isArray(item)) {
    if (arguments.length === 1) return item[0];
    return item.slice(0, n);
  }
  // for strings
  if(typeof item === 'string') {
    if(arguments.length === 1) return item[0];
    return item.split('').slice(0, n);
  } else {
    // for all other input types
    if (arguments.length === 2) return [];
  }
};

_.last = function (item, n) {
  // for arrays and strings
  if (Array.isArray(item) || typeof item === 'string') {
    if (arguments.length === 1) return item[item.length - 1];

    return item.slice(-n);
  }
};

module.exports = _;
