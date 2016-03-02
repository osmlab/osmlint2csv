'use strict';
var fs = require('fs');

module.exports = function(inputFile, type, done) {
  var data = [];
  var coordinates = {};
  var geojson = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  var header = 'way_id,st_astext';
  data.push(header);
  geojson.features.map(function(val) {
    if (coordinates[val.geometry.coordinates.join(',')] === undefined) {
      if (val.geometry.type == 'Point') {
        if (val.properties.type === type) {
          var raw = val.properties.fromWay + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
          data.push(raw);
        }
      }
      coordinates[val.geometry.coordinates.join(',')] = val.geometry.coordinates.join(',');
    }
  });
  done(data);
};