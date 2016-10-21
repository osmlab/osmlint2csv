'use strict';

var fs = require('fs');
var _ = require('underscore');
var readline = require('readline');

module.exports = function(inputFile, type, done) {
  var types = type.split(',');
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
      var id = val.properties._fromWay;
      var row;
      if (types.indexOf(val.properties._type) > -1) {
        if (val.geometry.type === 'MultiPoint') {
          var coors = val.geometry.coordinates;
          for (var z = 0; z < coors.length; z++) {
            if (result[id]) {
              result[id].push(coors[z]);
            } else {
              result[id] = [coors[z]];
            }
          }
        } else if (val.geometry.type === 'Point') {
          if (result[id]) {
            result[id].push(val.geometry.coordinates);
          } else {
            result[id] = [val.geometry.coordinates];
         }
        }
      }
    }
    _.each(result, function(v, key) {
      var row = 'MULTIPOINT(';
      for (var i = 0; i < v.length; i++) {
        if ((v.length - 1) === i) {
          row += v[i].join(' ');
        } else {
          row += v[i].join(' ') + ',';
        }
      }
      row = key + ',"' + row + ')"';
      console.log(row);
    });
  }).on('close', function() {
    done();
  });
};