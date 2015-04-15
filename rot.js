#!/usr/bin/env node

// put this on top of the answer files
//~58~%/)~;=0~+99~*65+r~%/)~099:~*/~,)0~*65+~8529~*6,/)76~,/*p4+


var fs = require('fs');

var map = {};
var str = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
str.split('').forEach(function(ch, i) {
  map[str[i]] = str[str.length - 1 - i];
});

var file = process.argv[2];

var input = fs.readFileSync(file).toString();

var output = input.split('\n').map(function(line) {
  return line.split('').map(function(ch) {
    return map[ch] || ch;
  }).join('');
}).join('\n');

fs.writeFileSync(file, output);
