#!/usr/bin/env node

// put the next line on top of your answer files
//}47}$.(}:</}*88})54*q}$.(}/889}).}+(/})54*}7418})5+.(65}714-o3*

var fs = require('fs');

var map = {};
var str = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}';
str.split('').forEach(function(ch, i) {
  map[str[i]] = str[str.length - 1 - i];
});

process.argv.slice(2).forEach(function(file) {
  var input = fs.readFileSync(file).toString();

  var output = input.split('\n').map(function(line) {
    return line.split('').map(function(ch) {
      return map[ch] || ch;
    }).join('');
  }).join('\n');

  fs.writeFileSync(file, output);

});

