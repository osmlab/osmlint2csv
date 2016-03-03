'use strict';

var fs = require('fs');
var _ = require('underscore');
var readline = require('readline');

module.exports = function(inputFile, done) {
  var rd = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });
  var header = '"geom"';
  //Print CSV header
  console.log(header);
  rd.on('line', function(line) {
    var obj = JSON.parse(line);
    var result = {};
    var features = obj.features;
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if (val.geometry.type == 'Point') {
        var id = val.properties.fromWay + '-' + val.properties.toWay;
        if (!result[id]) {
          result[id] = [val.geometry.coordinates];
        } else {
          result[id].push(val.geometry.coordinates);
        }
      }
    }
    _.each(result, function(val) {
      var row;
      if (val.length > 1) {
        row = 'MULTIPOINT(';
        for (var i = 0; i < val.length; i++) {
          if ((val.length - 1) == i) {
            row += val[i].join(' ');
          } else {
            row += val[i].join(' ') + ',';
          }
        }
        row = '"' + row + '"';
        console.log(row);
      } else {
        row = 'POINT(' + val[0].join(' ');
        row = '"' + row + '"';
        console.log(row);
      }
    });
  }).on('close', function() {
    done();
  });
};