'use strict';
var fs = require('fs');
var readline = require('readline');
var turf = require('turf');

module.exports = function(inputFile, type, done) {
  var tolerance = 0.0005;
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
      var val = turf.simplify(features[i], tolerance, false);
      // var val = features[i];
      var coors = val.geometry.coordinates;
      var row = coors.map(function(val) {
        return val.join(' ');
      }).join(',');
      console.log('"LINESTRING(' + row + ')"');

    }
  }).on('close', function() {
    done();
  });
};
