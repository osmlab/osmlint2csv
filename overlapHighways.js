'use strict';
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var _ = require('underscore');
var file = argv.file;
var turf = require('turf');
var result = {};
var geojson = JSON.parse(fs.readFileSync(file, 'utf8'));
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
fs.writeFile(file.split('.')[0] + '.csv', csv, function(er) {});