'use strict';

var fs = require('fs');
var _ = require('underscore');
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
    var result = {};
    var features = obj.features;
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if (val.geometry.type == 'LineString' && val.properties._type === type) {
        var coors = val.geometry.coordinates;
        var row = [];
        for (var j = 0; j < coors.length; j++) {
          row.push(coors[j].join(' '));
        }
        row = 'LINESTRING (' + row.join(',') + ')';
        row = val.properties._osm_way_id + ',"' + row + '"';
        console.log(row);
      }
    }
  }).on('close', function() {
    done();
  });
};