var update = require('./');
var state = {
  subTree: {
    unChanged: 11,
    change: [22],
    c: {
      d: {
        e: 5,
      }
    }
  }
};
var nextState = update(state, {
  subTree: {
    change: {$push: [33, 44]}
  }
});

var next = update(state, {
  subTree: {
    c: {
      d: {$merge: {f: 22, e: 22}}
    }
  }
})
debugger;
update({}, {'hasOwnProperty': {$set: 'a'}})
console.log(JSON.stringify(next, null, 2))
