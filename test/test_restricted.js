var request = require('supertest');
var express = require('express');
var expect = require("chai").expect;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var server = require('../api/server');
var config = require('../api/config');
var secret = config.jwt_secret;

var db = require("seraph")({
	server : config.db_url,
	user : config.db_user,
	pass : config.db_password
});

describe("These are tests for /Restricted", function(){
	it('Should pass if server returns 200 after GET /Restricted with valid token', function(done){
		var sampleReq = {email : 'r@r.com',password : 'r'};
		var token = jwt.sign(sampleReq, secret, { expiresInMinutes: 1});
		request(server)
			.get('/Restricted')
			.set('Content-Type','application/json') //set header for this test
	     	.set('Authorization', 'Bearer ' + token)
			.expect(200,done);
	});

	it('Should pass if server returns 401 after GET /Restricted without a token', function(done){
		var sampleReq = {email : 'r@r.com',password : 'r'};
		request(server)
			.get('/Restricted')
			.set('Content-Type','application/json') //set header for this test
			.expect(401,done);
	});

	it('Should pass if server returns 401 after GET /Restricted with an expired token', function(done){
		var sampleReq = {email : 'r@r.com',password : 'r'};
		var token = jwt.sign(sampleReq, secret, { expiresInMinutes: .00000000000001});
		request(server)
			.get('/Restricted')
			.set('Content-Type','application/json') //set header for this test
	     	.set('Authorization', 'Bearer ' + token)
			.expect(401,done);
	});
})