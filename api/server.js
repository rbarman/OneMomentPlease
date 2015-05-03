//modules
var express = require('express');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

var config = require('./config'); // config will hold all secret information
var secret = config.jwt_secret;

var routes = {}; // routes will hold all server API routes (users, posts, etc)
routes.users = require('./route/users');

var app = express();
module.exports = app;

// Client can only get /Profile endpoint with a valid token
// Use similar line below for other restricted endpoints
app.use('/User/Profile', expressJwt({secret: secret})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '../../public'));
app.set('jwtTokenSecret', secret);

//User Endpoint
app.get('/User/Profile', routes.users.getProfile);
app.post('/User/SignUp', routes.users.signUp);
app.post('/User/LogIn', routes.users.logIn);

//TODO : Post Endpoint

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
});
