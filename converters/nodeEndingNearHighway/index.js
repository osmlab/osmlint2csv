'use strict';
var fs = require('fs');
var minor = [];
var major = [];

module.exports = function(iFile, oFile) {
  var geojson = JSON.parse(fs.readFileSync(iFile, 'utf8'));
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
  var fileMinor = oFile.split('.')[0] + '-minor.csv';
  fs.writeFile(fileMinor, minor.join('\n'), function(err) {
    if (err) return err;
    console.log('output :', fileMinor, ',Format: https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor');
  });
  var fileMajor = oFile.split('.')[0] + '-major.csv';
  fs.writeFile(fileMajor, major.join('\n'), function(err) {
    if (err) return err;
    console.log('output :', fileMajor, ',Format https://github.com/osmlab/to-fix/wiki/Task-sources#unconnected-minor');
  });
};