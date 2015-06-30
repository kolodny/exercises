// Return a function that can take any of fn's arguments in stages.
const curry = (fn) => {
  const curried = (...a) => a.length < fn.length ?
           (...need) => curried(...a, ...need) :
           fn(...a);
  return curried;
};

export default curry;
