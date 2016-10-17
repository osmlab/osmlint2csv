'use strict';
var fs = require('fs');
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
    var features = obj.features;
    var objCoords = {};
    for (var i = 0; i < features.length; i++) {
      var val = features[i];
      if ((val.geometry.type === 'Point' || val.geometry.type === 'MultiPoint') && types.indexOf(val.properties._type) > -1) {
        var key = val.properties._fromWay;
        if (objCoords[key]) {
          objCoords[key].push(val.geometry.coordinates);
        } else {
          objCoords[key] = [val.geometry.coordinates];
        }
      }
    }
    for (var k in objCoords) {
      var mtltp = objCoords[k].map(function(c) {
        return c.join(' ');
      }).join(',');
      var row = k + ',"MULTIPOINT(' + mtltp + ')"';
      console.log(row);
    }
  }).on('close', function() {
    done();
  });
};