var myApp = angular.module('myApp');
myApp.controller('LandingPageCtrl',['$scope','LandingPageService', function($scope, LandingPageService){

	$scope.email = '';

	$scope.addToList = function(){
		if ($scope.mailingListForm.$valid) {
			LandingPageService.addEmail($scope.email);
     	}
	}

}]);