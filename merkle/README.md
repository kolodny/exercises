A merkle tree is an algorithm that takes a list of values and recursively reduces them by hashing them in pairs of two until a single value remains

### HUH?

Let's say I have a bunch of contacts in my contacts list, assume I have 8 contacts, if I wanted to create a merkle tree from this I would first line them up as follows:

```
C1 C2 C3 C4 C5 C6 C7 C8
```

then I would hash `C1 + C2`, literately concat the string values then run it through some hash function (md5, sha1, crc), and do the same for `C3 + C4`, `C5 + C6`, and `C7 + C8`

At the end of the first pass I'm left with the following:

```
 H12   H34   H56   H78
C1 C2 C3 C4 C5 C6 C7 C8
```

Now I repeat the process with H12, H34, H56, and H78. So now I'll concat `H12 + H34` and do the same for `H56 + H78` and I'll have this:

```
   H1234       H5678
 H12   H34   H56   H78
C1 C2 C3 C4 C5 C6 C7 C8
```

And one more pass


```
       H12345678
   H1234       H5678
 H12   H34   H56   H78
C1 C2 C3 C4 C5 C6 C7 C8
```

Now I've reduced the list of values to a single value.

**If you start with an odd number of elements, you need to first duplicate the last element to the end of the list to get an even number before starting the process**

## How is this useful?

Assume I wanted to know if a number is in the contacts list, but all I knew was the root number `H12345678`, I can ask someone who knows all the contact to send me some specific hashes and verify them myself. For example if I asked someone for `C6` they would send my `C5`, `H78`, and `H1234` and I would hash `C5 + C6` to get `H56` then do `H5678 = hash(H56 + H78)` and then do `root = hash(H1234 + H5678)` and check that the root I derive is the same as the root that I knew beforehand. If it matches then the data must have been in the set the entire time.

Since this is [Divide and conquer algorithm](https://en.wikipedia.org/wiki/Divide_and_conquer_algorithms), for a list of 1 quadrillion contacts (1,000,000,000,000,000) we only need 50 hashes.

For this exercise you need to return a function that takes a list of values and a hashing function an returns an object that contains a root property and a getVerification method as follows:


```js
var merkle = require('./') // <- this is the file you make;

// helper code from http://stackoverflow.com/a/7616484
var hasher = function(str) {
  var hash = 0, i, chr, len;
  if (str.length == 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};


var myMerkle = merkle(['This', 'is', 'a', 'test'], hasher);
console.log(myMerkle.root); // -1427219841
myMerkle.getVerification('not in tree'); // false

// this is an object that the server would return
var verificationObject = myMerkle.getVerification('test'); // { index: 3, breadcrumbs: [ 'a', '-1790830488' ] }

// this is how the client would verify that the contact exists (the client somehow already knows the root)
var root = myMerkle.root;
merkle.verify('test', root, obj, simpleHasher); // true
merkle.verify('testing', root, obj, simpleHasher); // false
```

More info: https://en.wikipedia.org/wiki/Merkle_tree
