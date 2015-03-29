var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/SignUp', function(req,res){
	console.log("server received post request to /SignUp");
	console.log(req.body);
	// insert req.body elements (req.body.firstName , etc) into a mongodb collection
	res.status(200).send("success");
});	

var port = 2000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
})