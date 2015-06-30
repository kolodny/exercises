const throttlePromises = (limit, promises) => {
  debugger;
  const results = [];

  // turn into promises with hint of state
  let queue = promises.map((p, i) => ({
    pending: false,
    then(resolve, reject) {
      this.pending = true;
      p().then((res) => {
        results[i] = res;
        resolve(res);
      });
    }
  }));

  // find next up
  const nextNonPending = () => {
    for(let index = 0; index < promises.length; index++ ) {
      if (!queue[index].pending) return index;
    }
    return -1;
  };
  
  return new Promise(function(resolve, reject) {
    // Count of finished "threads"
    let finished = 0;
    const iterate = (res) => {
      let next = nextNonPending();
      if (next == -1) {
        if (++finished == 5) {
          resolve(results);
        }
      } else {
        Promise.resolve(queue[next]).then(iterate);
      }
    };

    for(let i = 0; i < limit; i++) {
      Promise.resolve(queue[i]).then(iterate);
    }
  });
};

export default throttlePromises;
