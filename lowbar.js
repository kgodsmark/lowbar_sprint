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

_.first = function (array, n = 0) {
  return array[n];
};

module.exports = _;
