'use strict';
var fs = require('fs');
var majorRoads = [];

var minorRoads = [];
var pathRoads = [];
var coordinates = {};
module.exports = function(iFile, oFile) {
  var geojson = JSON.parse(fs.readFileSync(iFile, 'utf8'));
  var header = 'way_id,st_astext';
  majorRoads.push(header);
  minorRoads.push(header);
  pathRoads.push(header);
  geojson.features.map(function(val) {
    if (coordinates[val.geometry.coordinates.join(',')] === undefined) {
      if (val.geometry.type == 'Point') {
        if (val.properties.type === 'major') {
          var majorRaw = val.properties.wayA + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
          majorRoads.push(majorRaw);
        } else if (val.properties.type === 'minor') {
          var minorRaw = val.properties.wayA + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
          minorRoads.push(minorRaw);
        } else if (val.properties.type === 'path') {
          var pathRaw = val.properties.wayA + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
          pathRoads.push(pathRaw);
        }
      }
      coordinates[val.geometry.coordinates.join(',')] = val.geometry.coordinates.join(',');
    }
  });

  var fileMajor = oFile.split('.')[0] + '-majorRoads.csv';
  fs.writeFile(fileMajor, majorRoads.join('\n'), function(err) {
    if (err) return err;
    console.log('output :', fileMajor, ',Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor');
  });

  var fileMinor = oFile.split('.')[0] + '-minorRoads.csv';
  fs.writeFile(fileMinor, minorRoads.join('\n'), function(err) {
    if (err) return err;
    console.log('output :', fileMinor, ',Format: https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor');
  });

  var filePath = oFile.split('.')[0] + '-pathRoads.csv';
  fs.writeFile(filePath, pathRoads.join('\n'), function(err) {
    if (err) return err;
    console.log('output :', filePath, ',Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor');
  });
};