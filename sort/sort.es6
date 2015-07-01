import 'source-map-support/register';

const merge = (left, right) => {
  let result = [];

  while (left.length && right.length) {
    result.push((left[0] <= right[0]) ? left.shift() : right.shift());
  }

  return [...result, ...left, ...right];
};

const mergeSort = (arr) => {
  const len = arr.length;
  if (len <= 1) return arr;

  const pivot = Math.floor((len % 2 ? len - 1: len)/2);
  return merge(
    mergeSort(arr.slice(0, pivot)),
    mergeSort(arr.slice(pivot)));
};

export default mergeSort;
