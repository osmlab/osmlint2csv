'use strict';

var tape = require('tape');
var path = require('path');
var logInterceptor = require('log-interceptor');
var convert = require('../index.js');

var nodeendingnearhighwayJson = path.join(__dirname, '/fixtures/nodeendingnearhighway.json');
var overlaphighwaysJson = path.join(__dirname, '/fixtures/overlaphighways.json');

// Node Ending Near Highways 
tape('Generator CSV file unonnected major', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayJson, 'major', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '392705114,POINT(-77.05020368099213 -11.99787584587311)\n', 'First row of unconnected major,ok');
    assert.equal(logs.length, 3, 'Number of rows,ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected minor', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayJson, 'minor', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '71211318,POINT(-77.0794290304184 -12.013947644255211)\n', 'First row of unconnected minor,ok');
    assert.equal(logs.length, 7, 'Number of rows,ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected path', function(assert) {
  logInterceptor();
  convert.nodeendingnearhighway(nodeendingnearhighwayJson, 'path', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '295313053,POINT(-77.06977307796478 -11.954614182544745)\n', 'First row of unconnected path,ok');
    assert.equal(logs.length, 19, 'Number of rows,ok');
    assert.end();
  });
});

//Overlap highways
tape('Generator CSV file Overlaphighways', function(assert) {
  logInterceptor();
  convert.overlaphighways(overlaphighwaysJson, function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '"MULTIPOINT(-74.21774804592133 -13.15437605541851,-74.21806991100311 -13.154647685483653,-74.21832203865051 -13.154846184187093,-74.21846687793732 -13.154966328061079,-74.21854734420776 -13.155018564509675"\n', 'First row of overlaphighways,ok');
    assert.end();
  });
});