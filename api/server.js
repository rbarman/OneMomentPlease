//modules
var express = require('express');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

var config = require('./config'); // config will hold all secret information
var secret = config.jwt_secret;

var routes = {}; // routes will hold all server API routes (users, posts, etc)
routes.users = require('./route/users');
routes.restricted = require('./route/restricted');
routes.mailingList = require('./route/mailingList');

var app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(express.static(__dirname + '../../public'));

// All restricted endpoints must have -> expressJwt({secret : secret})
// expresJwt will check that the client sends a valid token in the request
// valid tokens are necessary to execute.

// General Restricted Endpoint
app.get('/Restricted', expressJwt({secret : secret}),routes.restricted.getRestricted);

//User Endpoint
app.get('/User/Profile',expressJwt({secret : secret}), routes.users.getProfile);
app.post('/User/SignUp', routes.users.signUp);
app.post('/User/LogIn', routes.users.logIn);

// MailingList Endpoint --
app.post('/MailingList', routes.mailingList.addToList);

//TODO : Post Endpoint

var port = process.env.PORT || 5000;
app.listen(port, function(){
	console.log("http://127.0.0.1:" + port);
});
