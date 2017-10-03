module.exports = function debounce(callback, thresholdMilliseconds) {
  return function () {
    setTimeout(callback, thresholdMilliseconds);
  };
}
