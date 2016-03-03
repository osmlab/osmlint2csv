'use strict';

var tape = require('tape');
var path = require('path');
var logInterceptor = require('log-interceptor');
var convert = require('../index.js');

var nodeendingnearhighwayGeojson = path.join(__dirname, '/fixtures/nodeendingnearhighway.geojson');
var overlaphighwaysGeojson = path.join(__dirname, '/fixtures/overlaphighways.geojson');

// Node Ending Near Highways 
tape('Generator CSV file unonnected major', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'major', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '392705114,POINT(-77.05020368099213 -11.99787584587311)\n', 'First row of unconnected major,ok');
    assert.equal(logs.length, 3, 'Number of rows,ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected minor', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'minor', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '71211318,POINT(-77.0794290304184 -12.013947644255211)\n', 'First row unconnected minor,ok');
    assert.equal(logs.length, 7, 'Number of rows,ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected path', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'path', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '295313053,POINT(-77.06977307796478 -11.954614182544745)\n', 'First row unconnected path,ok');
    assert.equal(logs.length, 19, 'Number of rows,ok');
    assert.end();
  });
});
// //Overlap highways
// tape('Generator CSV file Overlaphighways', function(assert) {
//   convert.overlaphighways(overlaphighwaysGeojson, function(data) {
//     assert.equal(data[3], '"POINT(-79.13154423236847 -7.876900342303941)"', 'ok');
//     assert.end();
//   });
// });