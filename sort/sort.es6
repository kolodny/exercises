import 'source-map-support/register';
const sort = (arr) => {
  const merge = (left, right) => {
    let result = [];

    while (left.length && right.length) {
      result.push((left[0] <= right[0]) ? left.shift() : right.shift());
    }

    while(left.length) {
      result.push(left.shift());
    }

    while(right.length) {
      result.push(right.shift());
    }

    return result;
  };

  const mergeSort = (arr) => {
    const len = arr.length;
    if (len <=1) return arr;

    let left = [], right = [];
    let pivot = Math.floor((len % 2 ? len - 1: len)/2);
    arr.forEach((n, i) => {
      if (i < pivot) {
        left.push(n);
      } else {
        right.push(n);
      }
    });

    return merge(mergeSort(left), mergeSort(right));
  };

  return mergeSort(arr);
};

export default sort;
