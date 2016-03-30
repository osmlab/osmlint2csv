'use strict';
var fs = require('fs');
var readline = require('readline');

module.exports = function(inputFile, type, done) {
  var rd = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });
  var header = 'geom';
  //Print CSV header
  console.log(header);
  rd.on('line', function(line) {
    var obj = JSON.parse(line);
    var features = obj.features;
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      var coors = val.geometry.coordinates;
      for (var j = 0; j < coors.length; j++) {
        var line = coors[j].map(function(val) {
          return val.join(' ');
        }).join(',');
        console.log('"LINESTRING(' + line + ')"');
      }
    }
  }).on('close', function() {
    done();
  });
};