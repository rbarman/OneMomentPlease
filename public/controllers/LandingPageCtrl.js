var myApp = angular.module('myApp');
myApp.controller('LandingPageCtrl',['LandingPageService', function(LandingPageService){

	this.email = '';

	this.addToList = function(){
		if ($scope.mailingListForm.$valid) {
			LandingPageService.addEmail($scope.email);
     	}
	}

}]);