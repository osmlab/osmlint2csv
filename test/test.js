'use strict';
var tape = require('tape');
var path = require('path');
var logInterceptor = require('log-interceptor');
var convert = require('../index.js');
var unconnectedhighwaysJson = path.join(__dirname, '/fixtures/unconnectedHighways.json');
var overlaphighwaysJson = path.join(__dirname, '/fixtures/overlapHighways.json');
var crossinghighwaysJson = path.join(__dirname, '/fixtures/crossingHighways.json');
var islandshighwaysJson = path.join(__dirname, '/fixtures/islandsHighways.json');

//Node Ending Near Highways
tape('Generator CSV file unonnected major highways', function(assert) {
  logInterceptor();
  convert.unconnectedhighways(unconnectedhighwaysJson, 'major', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '395848046,POINT(-80.64422965049744 -5.238657386201595)\n', 'First row of unconnected major,ok');
    assert.equal(logs.length, 2, 'Number of rows,ok');
    assert.end();
  });
});

//Overlap highways
tape('Generator CSV file Overlaphighways', function(assert) {
  logInterceptor();
  convert.overlaphighways(overlaphighwaysJson, 'major-major', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '404587643,"MULTIPOINT(-21.552000045776367 64.61334003253569,-21.552000045776367 64.61274001425042,-21.551910024136305 64.61236002337253,-21.551610035821795 64.61176001939808,-21.55007002875209 64.60978001297642,-21.549510033801198 64.60923001755359,-21.548722805455327 64.6085970220577)"\n', 'First row of overlaphighways,ok');
    assert.end();
  });
});

//Crossing highways
tape('Generator CSV file CrossingHighways', function(assert) {
  logInterceptor();
  convert.crossinghighways(crossinghighwaysJson, 'minor-minor', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '400836747,POINT(-75.04599417787446 -3.8267527969529067)\n', 'First row of crossinghighways,ok');
    assert.end();
  });
});

//Crossing highways
tape('Generator CSV file islandsHighways', function(assert) {
  logInterceptor();
  convert.islandshighways(islandshighwaysJson, 'major', function() {
    var logs = logInterceptor.end();
    assert.equal(logs[1], '395848046,"LINESTRING (-80.6451416015625 -5.2394106092951205,-80.6447821855545 -5.239116798976596,-80.64422965049744 -5.238657386201595)"\n', 'First row of islandsHighways,ok');
    assert.end();
  });
});
