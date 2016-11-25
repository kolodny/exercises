// Return a function that can take any of fn's arguments in stages.
const flattenThunk = (head) => (done) => {
  const rest = (err, result) =>
    typeof result === 'function' ? result(rest) : done(err, result);

  head(rest);
};


export default flattenThunk;
