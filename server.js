//module
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// used for setting the token, can be replaced with something else later
var secret = "secret";

var app = express();

// Client can only get /Profile endpoint with a valid token
// Use similar line below for other restricted endpoints
app.use('/Profile', expressJwt({secret: secret})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('jwtTokenSecret', secret);

var omp_db_url = 'mongodb://uniqueusername:unique6password@ds061371.mongolab.com:61371/omp_db';

var db = require("seraph")({
	server: "http://ompdb.sb05.stations.graphenedb.com:24789/",
	user: "omp_db",
	pass: "H2Kny8ISWZzuYBDaZGht"
});

app.get('/Profile', function(req, res){

	//TODO : add error catching
	MongoClient.connect(omp_db_url, function(err, db){
		var collection = db.collection('users');
		// find document with given email and return to controller
		collection.findOne({email : req.user.email}, function(err,document){
			if(!err){
				res.json(document);
			}
		});
	});

});

// post request to /SignUp
app.post('/SignUp', function(req,res){

	console.log("server received post request to /SignUp");
	console.log(req.body);

	db.save({ 
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		email:req.body.email, 
		password: req.body.password,
		dob: req.body.dob, 
		gender:req.body.gender, 
		question:req.body.question, 
		answer:req.body.answer 
	},

	'User', // adding a User label

	function(err, node) {
		if (err){
			console.log(err);
		}
		else {
		  	res.status(200).send("success: new user added");
			console.log("added a new user");
		}
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
				// res.status(200).send("success: LogIn successful");
				console.log("success: LogIn successful");
				var token = jwt.sign(req.body, secret, { expiresInMinutes: 60*5 });
				res.json({ token: token });
			}
			
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
})

