//module
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var request = require("request");
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

//Require the Neo4J module
var neo4j = require('node-neo4j');

// temp
var secret = "secret";

var app = express();
var host = localhost; 						//database runs on local host
var port_neo_db = 7474; 					//default port specified for neo4j in neo4j docs

// Client can only get /Profile endpoint with a valid token
// however /Profile view is not restricted -> must do in angular
app.use('/Profile', expressJwt({secret: secret})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('jwtTokenSecret', secret);

var omp_db_url = 'mongodb://uniqueusername:unique6password@ds061371.mongolab.com:61371/omp_db';

//This is the URL where we will POST our data to fire the cypher query. This is specified in Neo4j docs.
var httpUrlForTransaction = 'http://' + host + ':' + port_neo_db + '/db/data/transaction/commit';

//Create a db object. We will using this object to work on the DB.
db = new neo4j('http://localhost:7474');


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


//Run raw cypher with params
db.cypherQuery(
  'CREATE (somebody:Person { name: {name}, from: {company}, age: {age} }) RETURN somebody',
  {
    name: 'Ghuffran',
    company: 'Modulus',
    age: ~~(Math.random() * 100) //generate random age
  }, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.data); // delivers an array of query results
    console.log(result.columns); // delivers an array of names of objects getting returned
  }
);





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

