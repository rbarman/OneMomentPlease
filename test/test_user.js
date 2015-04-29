var request = require('supertest');
var express = require('express');
var expect = require("chai").expect;
var server = require('../api/server');
var config = require('../api/config');
var db = require("seraph")({
	server : config.db_url,
	user : config.db_user,
	pass : config.db_password
});

describe("These are tests regarding Signing Up", function(){
	// Clear the databse before each test in this block. 
	beforeEach(function(done) {
		var cypher = "MATCH(n) delete n";
		db.query(cypher, function(err, result) {
			if(err){
				console.log("unable to delete all nodes in the db!");
				console.log(err);
			}
			done();
		});
	});

	// User can not sign up with a taken email
	it("Should fail if user signs up with a taken email", function(done){

		db.save({ 
			firstName: "t_first name", 
			lastName: "t_last name", 
			email: "t_email",
			password: "t_password",
			dob: "t_dob",
			gender: "t_gender",
			question:"t_question",
			answer:"t_answer"
		},

		'User', // adding a User label

		function(err, node) {
			if (err){
				console.log(err);
				console.log("Error on saving a node.");
				done();
			}
			else {
				request(server)
				.post('/User/SignUp')
				.send({email:"t_email"})
				.expect(400, done);
			}
		});
	});

	// Signing up a valid user should return a 200 response. 
	it("Should pass if server responds with 200 after valid user signup", function(done){
		request(server)	
		.post('/User/SignUp')
		.send({ 
			firstName: "t_first name", 
			lastName: "t_last name", 
			email: "t_email",
			password: "t_password",
			dob: "t_dob",
			gender: "t_gender",
			question:"t_question",
			answer:"t_answer"
		})
		.expect(200,done);
	});
});