#!/usr/bin/env node

'use strict';
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var usage = function() {
  console.log('Usage: osmlint2csv --<options> <arguments ...>');
  console.log('  Example: osmlint2csv --conv=nodeendingnearhighway --type=major peru.geojson > peru.csv');
};
(function() {
  var validator = (function(name) {
    var validators = fs.readdirSync(path.join(__dirname, '/converters/'));
    for (var i = 0; i < validators.length; i++) {
      if (validators[i].toLowerCase() === name.toLowerCase()) {
        return require(path.join(__dirname, 'converters/', validators[i]));
      }
    }
    return null;
  })(argv.conv);
  if (!validator) {
    console.error('Unknown validator "' + argv._[0] + '"');
    return usage();
  }
  if (argv.conv === 'nodeendingnearhighway') {
    validator(argv._[0], argv.type, function(data) {
      console.log(data.join('\n'));
    });
  }
})();