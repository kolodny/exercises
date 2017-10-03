module.exports = function debounce(callback, thresholdMilliseconds) {
  let timeoutId;

  return function () {
    const callCallback = () => callback.call(this, ...arguments);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callCallback, thresholdMilliseconds);
  };
}
