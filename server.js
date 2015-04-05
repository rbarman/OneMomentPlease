var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var omp_db_url = 'mongodb://uniqueusername:unique6password@ds061371.mongolab.com:61371/omp_db';

// post request to /SignUp
app.post('/SignUp', function(req,res){

	console.log("server received post request to /SignUp");
	console.log(req.body);

	MongoClient.connect(omp_db_url, function (err, db) {

		var collection = db.collection('users');

		collection.count( {email : req.body.email }, function(err, count) { //checks if email already exists in db
			if(count == 0) {
			// insert req.body elements (req.body.firstName , etc) into a mongodb collection

				collection.insert({
					firstName:req.body.firstName,
					lastName:req.body.lastName,
					email: req.body.email,
					password: req.body.password,
					dob: req.body.dob,
					gender: req.body.gender
				}, function(err, docs) {
					
					if(!err) {
						// 200 is OK
						res.status(200).send("success: new user added");
						console.log("added record!");
					}
					else {
						//500 is internal error
						res.status(500).send("failure: new user not added");
						console.log("failure: new user not added");
					}

				});

			}

			// send appropriate message back (if email are really unique)

			else {
				//400 is Bad request
				res.status(400).send("failure: user already exists");
				console.log("email id already exists");
			}
		})

	});

});	

// post request to /LogIn
app.post('/LogIn', function(req, res){
	console.log("server received post request to /LogIn");
	console.log(req.body);
	// check if email and password match
	MongoClient.connect(omp_db_url, function (err, db) {

		var collection = db.collection('users');

		collection.count( {email : req.body.email, password : req.body.password}, function(err, count) {
			
			if(count == 0) { // no record found with the email password combination
				res.status(400).send("failure: email and password do not match");
				console.log("failure: email and password do not match")
			}
			else {
				res.status(200).send("success: LogIn successful");
				console.log("success: LogIn successful");
			}
			
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
})

