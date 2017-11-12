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

_.first = function () {

};

module.exports = _;
