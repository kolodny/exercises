const async = {};

// Run array in sequence return sequence ready to fire with parameters err, data
async.sequence = (funcs) => (done) =>
  (function next(err, data) {
    let current = funcs.shift();
    if (current && !err) {
      return current(next, data);
    } else {
      return done(err, data);
    }
  })();

// Run array in parallel returning an err, array of data collected
async.parallel = (funcs, limit = funcs.length) => (done) => {
  let fired = 0;
  const collect = [];
  const fire = (i) => (err, data) => {
    collect[i] = data;
    if (++fired == limit || err) {
      return done(err, limit == 1 ? collect[i] : collect);
    }
  };

  funcs.some((f, i) => f(fire(i)));
};

// Run array of functions calling done on first completed
async.race = (funcs) => async.parallel(funcs, 1);

export default async;
