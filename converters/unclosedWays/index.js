'use strict';

var fs = require('fs');
var readline = require('readline');

module.exports = function(inputFile, type, done) {
  var rd = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });
  var header = 'way,geom';
  //Print CSV header
  console.log(header);
  rd.on('line', function(line) {
    var obj = JSON.parse(line);
    var features = obj.features;
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if (val.geometry.type === 'LineString') {
        var id = val.properties['@id'];
        var coor = val.geometry.coordinates;
        var row = id + ',"MULTIPOINT(' + coor[0].join(' ') + ',' + coor[coor.length - 1].join(' ') + ')"';
        console.log(row);
      }
    }
  }).on('close', function() {
    done();
  });
};
