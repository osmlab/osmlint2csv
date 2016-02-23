'use strict';
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var file = argv.file;
var minor = [];
var major = [];
var geojson = JSON.parse(fs.readFileSync(file, 'utf8'));
var header = 'way_id,st_astext';
minor.push(header);
major.push(header);
geojson.features.map(function(v) {
  if (v.geometry.type == 'Point') {
    if (v.properties.type === 'minor') {
      var minorRaw = v.properties.wayA + ',' + 'POINT(' + v.geometry.coordinates.join(' ') + ')';
      minor.push(minorRaw);
    } else {
      var majorRaw = v.properties.wayA + ',' + 'POINT(' + v.geometry.coordinates.join(' ') + ')';
      major.push(majorRaw);
    }
  }
});
fs.writeFile(file.split('.')[0] + '-minor.csv', minor.join('\n'), function(er) {});
fs.writeFile(file.split('.')[0] + '-major.csv', major.join('\n'), function(er) {});