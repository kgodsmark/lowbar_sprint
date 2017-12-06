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

module.exports = binarySearch;