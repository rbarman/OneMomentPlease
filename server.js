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

	// //TODO : add error catching
	// MongoClient.connect(omp_db_url, function(err, db){
	// 	var collection = db.collection('users');
	// 	// find document with given email and return to controller
	// 	collection.findOne({email : req.user.email}, function(err,document){
	// 		if(!err){
	// 			res.json(document);
	// 		}
	// 	});
	// });

});

// post request to /SignUp
app.post('/SignUp', function(req,res){

	console.log("server received post request to /SignUp");
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
						res.status(500).send("failure: new user not added");
						console.log("Error on saving a node.");
					}
					else {
					  	res.status(200).send("success: new user added");
						console.log("Successfully added a new user");
					}
				});
			}
			else{
				res.status(400).send("failure: user already exists");
				console.log("email already exists");
			}
		}
	});
});	

// post request to /LogIn
app.post('/LogIn', function(req, res){
	console.log("server received post request to /LogIn");
	console.log(req.body);

	// check if email and password match
	var cypher = "MATCH(n) WHERE n.password ='" + req.body.password + "' AND n.email = '" + req.body.email + "' return n";
	db.query(cypher, function(err, result){
		if(err){
			console.log(err);
			console.log("Error on finding any nodes with given email and password.");
			res.status(500).send("failure: new user not added");
		}
		else{
			if(result.length == 0){
				res.status(400).send("failure: email and password do not match");
				console.log("failure: email and password do not match")
			}
			else{
				console.log("success: LogIn successful");
				var token = jwt.sign(req.body, secret, { expiresInMinutes: 60*5 });
				res.json({ token: token });
			}
		}
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
})