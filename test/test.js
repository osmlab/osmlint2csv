'use strict';

var tape = require('tape');
var path = require('path');
var logInterceptor = require('log-interceptor');
var convert = require('../index.js');

var nodeendingnearhighwayGeojson = path.join(__dirname, '/fixtures/nodeendingnearhighway.geojson');
var overlaphighwaysGeojson = path.join(__dirname, '/fixtures/overlaphighways.geojson');

// Node Ending Near Highways 
tape('Generator CSV file unonnected major', function(assert) {
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'major', function(data) {
    assert.equal(data[1], '370656776,POINT(-79.13154423236847 -7.876900342303941)', 'ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected minor', function(assert) {
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'minor', function(data) {
    assert.equal(data[1], '378247073,POINT(-76.21270000934601 -6.6894415241733896)', 'ok');
    assert.end();
  });
});

tape('Generator CSV file unonnected path', function(assert) {
  convert.nodeendingnearhighway(nodeendingnearhighwayGeojson, 'minor', function(data) {
    assert.equal(data[1], '378247073,POINT(-76.21270000934601 -6.6894415241733896)', 'ok');
    assert.end();
  });
});


//Overlap highways


tape('Generator CSV file unonnected major', function(assert) {
  convert.overlaphighways(overlaphighwaysGeojson, function(data) {

    console.log(data);
   // assert.equal(data[1], '370656776,POINT(-79.13154423236847 -7.876900342303941)', 'ok');
    assert.end();
  });
});
