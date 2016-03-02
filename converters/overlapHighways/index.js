'use strict';
var fs = require('fs');
var _ = require('underscore');
var result = {};
module.exports = function(inoputFile, done) {
  var geojson = JSON.parse(fs.readFileSync(inoputFile, 'utf8'));
  geojson.features.map(function(val) {
    if (val.geometry.type == 'Point') {
      var id = val.properties.wayA + '-' + val.properties.wayB;
      if (!result[id]) {
        result[id] = [val.geometry.coordinates];
      } else {
        result[id].push(val.geometry.coordinates);
      }
    }
  });
  var header = '"geom"\n';
  var data = [];
  _.each(result, function(val) {
    var row = '';
    if (val.length > 1) {
      row = 'MULTIPOINT(';
      for (var i = 0; i < val.length; i++) {
        if ((val.length - 1) == i) {
          row += val[i].join(' ');
        } else {
          row += val[i].join(' ') + ',';
        }
      }
    } else {
      row += 'POINT(' + val[0].join(' ');
    }
    data.push('"' + row + ')"');
    // csv += row;
  });

  done(data);

  // fs.writeFile(oFile, csv, function(err) {
  //   if (err) return err;
  //   console.log('output :', oFile, ',Format : https://github.com/osmlab/to-fix/wiki/Task-sources#krakatoa');
  // });
};