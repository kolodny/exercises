import 'source-map-support/register'

const a = (time) => (Math.abs(time) % 100);
const throttle = (fn, wait) => {
  let then = 0;
  let pending = null;
  let args;
  let result;
  let ctx;

  const prev = () => {
    then = +new Date();
    pending = null;
    result = fn.apply(ctx, args);
    if (!pending) args = null;
  };

  return function() {
    let now = +new Date();
    let ctx = this;
    args = arguments;

    if (!then) {
      then = now;
      fn.apply(this, args);
    }
    let diff = wait - (now - then);

    if (diff <= 0 || diff > wait) {
      if (pending) {
        clearTimeout(pending);
        pending = null;
      }
      then = now;
      return fn.apply(ctx, args);
    } else if (!pending) {
      pending = setTimeout(prev, wait);
    }

    return result;
  };
};

export default throttle;
