var config = require('../config');

var db = require("seraph")({
	server : config.db_url,
	user : config.db_user,
	pass : config.db_password
});

exports.addToList = function(req,res){
	console.log("server received post request to /MailingList");
	console.log(req.body);

	db.save({
		email:req.body.email
	},
	'MailingList', //adding MailingList label
	function(err, node) {
		if (err){
			console.log(err);
			res.status(500).send("failure: email not added to mailing list");
			console.log("Error on saving a node.");
		}
		else {
		  	res.status(200).send("success: email added to mailing list");
			console.log("Successfully added a email");
		}
	});
}
