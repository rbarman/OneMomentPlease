var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = require('../config');
var secret = config.jwt_secret;
var nodemailer = require('nodemailer');
var uuid = require('uuid');

var db = require("seraph")({
	server : config.db_url,
	user : config.db_user,
	pass : config.db_password
});

var smtpTransport = nodemailer.createTransport("SMTP",{		
	service: "MailGun",		
	auth:{		
		user: config.mailgun_user,
		pass: config.mailgun_password
	}		
});		
		
exports.logIn = function(req, res) {

	console.log("server received post request to /User/LogIn");
	console.log(req.body);

	// 1. Get hashed password given the email
	// 2. Compare given password to hashed password
	// 3. match or !match
	var predicate = { email: req.body.email};
	db.find(predicate, [false, 'User'],function (err, objs) {
		if (err) {
			console.log(err);
			console.log("Error on finding any nodes with given email (/LogIn POST).");
			res.status(500).send("failure: unable to LogIn");
		}
		else{
			// There should only be one user or 0 users with the given email
			if(objs.length == 0){
				console.log("No users with the given email");
				res.status(400).send("failure: email and password do not match");
			}
			else {
				var hashedPassword = objs[0].password;
				bcrypt.compare(req.body.password, hashedPassword, function(err ,match){
					if(err){
						console.log(err);
						console.log("Error on Comparing given password and hashed password");
						res.status(500).send("failure: unable to LogIn");
					}
					else{
						// match is true or false;
						if(match){
							console.log("passwords match, LogIn successful ");
							var token = jwt.sign(req.body, secret, { expiresInMinutes: 60*5 });
							res.json({ token: token });
						}
						else{
							res.status(400).send("failure: email and password do not match");
							console.log("failure: email and password do not match")
						}
					}
				});
			}
		}
	});	
}

exports.getProfile = function(req, res){
	console.log("server received post request to /User/Profile");
	console.log(req.body);

	var predicate = { email: req.user.email};
	db.find(predicate, [false, 'User'],function (err, objs) {
		if (err) {
			console.log(err);
			console.log("Error on finding any nodes with given email. (/Profile POST)");
			res.status(500).send("failure: new user not added");
		}
		else{
			console.log(objs);
			res.json(objs);
		}
	});	
};

exports.signUp = function(req, res){
	console.log("server received post request to /User/SignUp");
	console.log(req.body);

	// need to check if there is a User with the email provided. 
	var predicate = { email: req.body.email};
	db.find(predicate, [false, 'User'],function (err, objs) {

		if (err) {
			console.log(err);
			console.log("Error on finding any nodes with given email.");
			res.status(500).send("failure: new user not added");
		}
		else {

			// objs.length is the count of Users with given email. 
			if(objs.length == 0){

				var hashedPassword = bcrypt.hashSync(req.body.password);
				var verificationCode = uuid.v1();

				db.save({ 
					firstName: req.body.firstName, 
					lastName: req.body.lastName, 
					email:req.body.email, 
					password: hashedPassword,
					dob: req.body.dob, 
					gender:req.body.gender, 
					question:req.body.question, 
					answer:req.body.answer, 
					verificationCode: verificationCode, 
					isVerified: "false"
				},

				'User', // adding a User label

				function(err, node) {
					if (err){
						console.log(err);
						res.status(500).send("failure: new user not added");
						console.log("Error on saving a node.");
					}
					else {
						res.status(200).send("success: new user added");
						console.log("Successfully added a new user");

						// sending verification email to user
						var link="http://localhost:5000/#/Verify/"+ verificationCode;		
						var mailOptions={		
							// user will see 'noreply@omp.com via mailgun.org'		
							from: 'OMPservice<noreply@omp.com>',		
							to : req.body.email,		
							subject : "Please confirm your Email account",		
							html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 		
						};		

						console.log(mailOptions);

						smtpTransport.sendMail(mailOptions, function(error, response){		
							if(error){		
								console.log(error);		
							} else{		
								console.log("Message sent: " + response.message);		
							}
						});
					}
				});
			}
			else{
				res.status(400).send("failure: user already exists");
				console.log("email already exists");
			}
		}
	});
};

exports.verifyUser = function(req, user){

	console.log("server received post request to /User/Verify");		
	console.log(req.body);		
	var verificationCode = req.body.verificationCode;		

	var predicate = {verificationCode : verificationCode};		

	db.find(predicate, [false, 'User'],function (err, objs) {		

		if (err) {		
			console.log(err);		
			console.log("Error on finding any nodes with given verification code.");		
			res.status(500).send("failure: error in finding verification code");		
		}		
		
		else {		
			if(objs.length == 0) {		
				console.log("No user with such verification code");		
				res.status(500).send("failure: no such verication code");		
			}		
			else if(objs.length == 1) {		
				var cypher = "MATCH (n : User {verificationCode : \'" + verificationCode + "\'})"		
				+"SET n.isVerified = 'true'"		
				+ "RETURN n";		

				db.query(cypher, function(err, result) {		
					if (err) {console.log(err)};		
					console.log("Result received: " + result);		
				});		
			}		
		}		
	});		
};