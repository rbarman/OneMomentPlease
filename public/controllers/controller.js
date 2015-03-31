var myApp = angular.module('myApp',['ui.bootstrap','ngRoute']);

// router
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/SignUp',{
      templateUrl:'../views/signup.html',
      controller: 'SignUpCtrl'
    }).
    otherwise({
      redirectTo:'/SignUp'
    });
}]);

// services
myApp.service('SignUpService',function($http){
  this.signUp = function(credentials){
    console.log(credentials);
    $http.post('/SignUp', credentials)
     .success(function(response){
       console.log(response);
    });
  };
});

// controllers
myApp.controller('SignUpCtrl',['$scope','$http','SignUpService', function($scope, $http, SignUpService) {
	console.log("hello from SignUpCtrl!");

	// $scope.credentials will store information regarding user sign up. 
   $scope.credentials = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    gender: ''
  };

	$scope.createNewAccount = function(){
    SignUpService.signUp($scope.credentials);
	};
}]);