# Lowbar
My implementation of JavaScript's Underscore library.

You will find the following methods in the lowbar.js file.

## Lowbar I - Arrays and Objects

* [identity](http://underscorejs.org/#identity)
* [values](http://underscorejs.org/#values)
* [first](http://underscorejs.org/#first)
* [last](http://underscorejs.org/#last)
* [each](http://underscorejs.org/#each)
* [indexOf](http://underscorejs.org/#indexOf)
* [filter](http://underscorejs.org/#filter)
* [reject](http://underscorejs.org/#reject)
* [uniq](http://underscorejs.org/#uniq)
* [map](http://underscorejs.org/#map)
* [contains](http://underscorejs.org/#contains)
* [pluck](http://underscorejs.org/#pluck)
* [reduce](http://underscorejs.org/#reduce)
* [every](http://underscorejs.org/#every)
* [some](http://underscorejs.org/#some)
* [extends](http://underscorejs.org/#extends)
* [defaults](http://underscorejs.org/#defaults)

## Lowbar II - Advanced Methods

* [once](http://underscorejs.org/#once)
* [negate](http://underscorejs.org/#negate)
* [shuffle](http://underscorejs.org/#shuffle)
* [invoke](http://underscorejs.org/#invoke)
* [sortBy](http://underscorejs.org/#sortBy)
* [zip](http://underscorejs.org/#zip)
* [sortedIndex](http://underscorejs.org/#sortedIndex)
* [flatten](http://underscorejs.org/#flatten)
* [intersection](http://underscorejs.org/#intersection)
* [difference](http://underscorejs.org/#difference)
* [memoize](http://underscorejs.org/#memoize)
* [delay](http://underscorejs.org/#delay)
* [where](http://underscorejs.org/#where)
* [throttle](http://underscorejs.org/#throttle)
* [partial](http://underscorejs.org/#partial)


### Prerequisites

Built using Node.js v8.6.0 and then used Chai v3.5.0 and Mocha v.3.5.0 for test driven development.


### Using the library

If you would like to use this underscore library in your code, open the terminal window, close this repo, and execute
```
$ npm install
```

You can then copy the lowbar.js file into your working files and require it in using
```
$ const _ = require('./lowbar.js');
```

Making sure to check the path. 

You can then start using the functions as follows
```
_.identity('hello world')
```

## Running the tests

To run the tests in the mocha test environment
```
$ npm test
```

## Authors

* **Kerry Godsmark** - [Kerry](https://github.com/kgodsmark)


## Acknowledgments

* Northcoders coding bootcamp