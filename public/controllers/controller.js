var myApp = angular.module('myApp',['ui.bootstrap','ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/SignUp',{
    	templateUrl:'./signup.html',
    	controller: 'SignUpCtrl'
    }).
    otherwise({
      redirectTo:'/SignUp'
    });
}]);

myApp.controller('SignUpCtrl',['$scope','$http', function($scope, $http) {
	console.log("hello from SignUpCtrl!");

	// $scope.credentials will store information regarding user sign up. 

	$scope.createNewAccount = function(){
		console.log("controller received : ");
		console.log("firstName : " + $scope.credentials.firstName);
		console.log("lastName : " + $scope.credentials.lastName);
		console.log("username : " + $scope.credentials.username);
		console.log("email : " + $scope.credentials.email);
		console.log("password : " + $scope.credentials.password);
		console.log("gender : " + $scope.credentials.gender);
		console.log("dob : " + $scope.credentials.dob);

		$http.post('/SignUp', $scope.credentials)
			.success(function(response){
				console.log(response);
		});
	};
}]);