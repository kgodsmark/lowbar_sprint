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
  if(arguments.length === 1) return item[0];
  if(n === 0 || !item.length) return [];
  if(item.length) return Array.isArray(item) ? item.slice(0, n) : item.split('').slice(0, n);
};

_.last = function (item, n) {
  if(arguments.length === 1) return item[item.length - 1];
  if(n === 0 || !item.length) return [];
  if(item.length) return Array.isArray(item) ? item.slice(-n) : item.split('').slice(-n);
};

_.each = function () {

};

module.exports = _;
