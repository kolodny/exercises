module.exports = function debounce(callback, thresholdMilliseconds) {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, thresholdMilliseconds);
  };
}
