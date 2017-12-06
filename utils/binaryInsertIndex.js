function binaryInsertIndex(array, value, start, end) {
  start = start || 0;
  end = end || array.length;
  let index = Math.floor((start + end) / 2);
  if (start > end || start === end || end < start) return -1;
  console.log(array[index], index, index-1, index+1);
  if (value <= array[index] && value >= array[index-1]) {
    return index-1;
  }
  else if (value >= array[index] && value >= array[index+1]) {
    return index-1;
  } else if (value < array[index]) {
    return binaryInsertIndex(array, value, start, index - 1);
  } else if (value > array[index]) {
    return binaryInsertIndex(array, value, index + 1, end);
  }
}

module.exports = binaryInsertIndex;