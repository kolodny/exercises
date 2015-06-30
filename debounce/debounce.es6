// Return a function that can take any of fn's arguments in stages.
const debounce = function(fn, delay) {
  let timeout;
  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn.bind(this), delay, ...args);
  };
};
export default debounce;
