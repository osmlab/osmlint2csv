'use strict';
var fs = require('fs');
var _ = require('underscore');
var result = {};
module.exports = function(inoputFile, done) {
  var geojson = JSON.parse(fs.readFileSync(inoputFile, 'utf8'));
  geojson.features.map(function(val) {
    if (val.geometry.type == 'Point') {
      var id = val.properties.fromWay + '-' + val.properties.toWay;
      if (!result[id]) {
        result[id] = [val.geometry.coordinates];
      } else {
        result[id].push(val.geometry.coordinates);
      }
    }
  });
  var header = '"geom"';
  var data = [];
  data.push(header);
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
  });
  done(data);
};