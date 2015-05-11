var jwt = require('jsonwebtoken');
var config = require('../config');
var secret = config.jwt_secret;

exports.getRestricted = function(req, res){

	console.log("server received post request to /Restricted");
	res.status(200).send("success: can access restricted");
}