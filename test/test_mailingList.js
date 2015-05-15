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

describe("These are tests for /MailingList", function(){
	// Delete node with t_email@t_email.com as email
	afterEach(function(done){
		var cypher  = "match(n:MailingList{email:'t_email@t_email.com'} ) delete n";
		db.query(cypher, function(err, result) {
			if(err){
				console.log("unable to delete t_email@t_email.com node from MailingList in the db!");
				console.log(err);
			}
			done();
		});
	});

	it("Should pass if valid email sent to POST /MailingList", function(done){
		request(server)
		.post('/MailingList')
		.send({
			email:"t_email@t_email.com"
		})
		.expect(200,done);
	});
})