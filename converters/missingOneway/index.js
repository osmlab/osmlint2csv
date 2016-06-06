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
      if (val.geometry.type === 'LineString' && types.indexOf(val.properties._type) > -1) {
        var id = val.properties['@id'];
        var coor = val.geometry.coordinates;
        var strCoor = '';
        for (var k = 0; k < coor.length; k++) {
          if (k === 0) {
            strCoor = coor[k].join(' ');
          } else {
            strCoor = strCoor + ',' + coor[k].join(' ');
          }
        }
        var row = id + ',"MULTIPOINT(' + strCoor + ')"';
        console.log(row);
      }
    }
  }).on('close', function() {
    done();
  });
};