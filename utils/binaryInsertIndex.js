function binaryInsertIndex(array, value, start, end) {
  start = start || 0;
  end = end || array.length;
  let index = Math.floor((start + end) / 2);
  if (start > end || start === end || end < start) return 0;
  if(value < array[start]) return 0;
  if(value > array[end-1]) return array.length;
  if (value <= array[index] && value >= array[index-1]) {
    return index;
  }
  else if (value >= array[index] && value <= array[index+1]) {
    return index+1;
  } else if (value < array[index]) {
    return binaryInsertIndex(array, value, start, index - 1);
  } else if (value > array[index]) {
    return binaryInsertIndex(array, value, index + 1, end);
  }
}

module.exports = binaryInsertIndex;