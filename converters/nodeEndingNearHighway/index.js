'use strict';
var fs = require('fs');
var readline = require('readline');



module.exports = function(inputFile, type, done) {
  var rd = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });
  var header = 'way_id,st_astext';
  console.log(header);

  rd.on('line', function(line) {
    var obj = JSON.parse(line);
    var features = obj.features;
    var data = [];
    var coordinates = [];
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if (coordinates[val.geometry.coordinates.join(',')] === undefined) {
        if (val.geometry.type == 'Point') {
          if (val.properties.type === type) {
            var raw = val.properties.fromWay + ',' + 'POINT(' + val.geometry.coordinates.join(' ') + ')';
            data.push(raw);
          }
        }
        coordinates[val.geometry.coordinates.join(',')] = val.geometry.coordinates.join(',');
      }
    }
    if (data.length > 0) {
      console.log(data.join('\n'));
    }
  }).on('close', function() {
    process.exit(0);
  });
};