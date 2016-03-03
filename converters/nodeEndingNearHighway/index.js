'use strict';

var fs = require('fs');
var readline = require('readline');

module.exports = function(inputFile, type, done) {
  var rd = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });
  var header = 'way_id,st_astext';
  //Print CSV header
  console.log(header);
  rd.on('line', function(line) {
    var obj = JSON.parse(line);
    var features = obj.features;
    var data = [];
    var coordinates = [];
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if (coordinates[val.geometry.coordinates.join(',')] === undefined) {
        if (val.geometry.type == 'Point') {
          if (val.properties.type === type) {
            var row = val.properties.fromWay + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
            console.log(row);
          }
        }
        coordinates[val.geometry.coordinates.join(',')] = val.geometry.coordinates.join(',');
      }
    }
  }).on('close', function() {
    done();
  });
};