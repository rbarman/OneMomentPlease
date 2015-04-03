var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// post request to /SignUp
app.post('/SignUp', function(req,res){
	console.log("server received post request to /SignUp");
	console.log(req.body);
	// insert req.body elements (req.body.firstName , etc) into a mongodb collection
		// send appropriate message back (if username + email are really unique)
	res.status(200).send("success");
});	

// post request to /LogIn
app.post('/LogIn', function(req, res){
	console.log("server received post request to /LogIn");
	console.log(req.body);
	// check if username and password match 
		// send appropriate message back to controller
	res.status(200).send("success");
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
})