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

_.first = function (array, n) {
  if(arguments.length === 1) return array[0];
  if (n === 1) { return array.slice(0, n); }
  return array.slice(0, n);
};

module.exports = _;
