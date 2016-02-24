'use strict';
var fs = require('fs');
var _ = require('underscore');
var result = {};
module.exports = function(iFile, oFile) {
  var geojson = JSON.parse(fs.readFileSync(iFile, 'utf8'));
  geojson.features.map(function(v) {
    if (v.geometry.type == 'Point') {
      var id = v.properties.wayA + '-' + v.properties.wayB;
      if (!result[id]) {
        result[id] = [v.geometry.coordinates];
      } else {
        result[id].push(v.geometry.coordinates);
      }
    }
  });
  var csv = '"geom"\n';
  _.each(result, function(v) {
    var row = '';
    if (v.length > 1) {
      row = 'MULTIPOINT(';
      for (var i = 0; i < v.length; i++) {
        if ((v.length - 1) == i) {
          row += v[i].join(' ');
        } else {
          row += v[i].join(' ') + ',';
        }
      }
    } else {
      row += 'POINT(' + v[0].join(' ');
    }
    row = '"' + row + ')"\n';
    csv += row;
  });
  fs.writeFile(oFile, csv, function(err) {
    if (err) return err;
    console.log('output :', oFile, ',Format : https://github.com/osmlab/to-fix/wiki/Task-sources#krakatoa');
  });
};