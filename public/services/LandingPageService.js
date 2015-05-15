var myApp = angular.module('myApp');
myApp.service('LandingPageService', function($http, toaster){

	this.addEmail = function(email){
		$http.post('/MailingList', {email:email})
		.success(function(response){
			console.log("success in adding to mailing list");
			toaster.pop('success', "Success", "Your email has been added to our mailing list");

		})
		.error(function(response){
			console.log("failure in adding to mailing list");
		    toaster.pop('error', "Failure", "unable to add to mailing list. Please try again");
		});
	}
});