var request = require('supertest');
var express = require('express');
var expect = require("chai").expect;
var server = require('../api/server');

// describe() is a label for a series of tests
// it() is a label for a certain test

describe("These are simple math tests", function(){
	it("should pass if 1 + 1 is 2", function(done){
		var a = 1 + 1;
		expect(a).to.equal(2);
		done();
	});
});

describe("These are Server Endpoint tests", function(){
	it('calling GET /Test should respond with a json', function(done){
		request(server)
	      .get('/Test')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200, done);
	});
});

