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
  // for arrays and strings
  if (Array.isArray(item) || typeof item === 'string') {
    if (arguments.length === 1) return item[0];

    let result = [];
    for (let i = 0; i < n; i++) {
      result.push(item[i]);
    }
    return result;
  } else {
    // for all other input types
    if (arguments.length === 2) return [];
  }
};

_.last = function () {

};

module.exports = _;
