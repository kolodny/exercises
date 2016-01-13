A binary search is an algorithm where you look for an item in a sorted array using a divide and conquer technique

The classic example given is looking for a name in a phonebook, you first look in the middle and if the name is higher you take the upper half and start the process again, ditto if it was lower 

Imagine a bunch of words in a list

```js
['apple', 'banana', 'cherry', 'dates', 'eggs', 'figs', 'grapes']
```

If we looks for `cherry` then we first look at the middle of the array we have:

```js
                                VVV
['apple', 'banana', 'cherry', 'dates', 'eggs', 'figs', 'grapes']
```

Since `dates` are larger than `cherry` we need to take the lower half of the array and try again:

```js
            VVVV
['apple', 'banana', 'cherry',
```

Now `banana`  is the middle so we take the larger part of the array and try again:

```js
   VVVV
['cherry']
```

We found it!

Think about how to write this algorithm and keep in mind edge cases like how to not get caught in an infinite loop if it's not found, or what to do when there are an even number of elements

Here's the basic usage of the file that you'll be creating:

```js
var search = require('./') // <- this is the file you make;

var arr = ['apple', 'banana', 'cherry', 'dates', 'eggs', 'figs', 'grapes'];

var foundAt = search(arr, 'cherry'); // 2 since arr[2] === 'cherry'

foundAt = search(arr, 'zebra') // -1 for not found
```

More info: https://en.wikipedia.org/wiki/Binary_search_algorithm
