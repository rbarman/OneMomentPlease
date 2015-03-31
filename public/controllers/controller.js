var myApp = angular.module('myApp',['ui.bootstrap','ngRoute']);

// router
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/SignUp',{
      templateUrl:'../views/signup.html',
      controller: 'SignUpCtrl'
    }).
    when('/LogIn',{
      templateUrl:'../views/login.html',
      controller: 'LogInCtrl'
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
    })
      .error(function(response){
        console.log(response);
    });
  };
});

myApp.service('LogInService', function($http){
  this.logIn = function(credentials){
    console.log(credentials);
    $http.post('LogIn', credentials)
      .success(function(response){
        console.log(response);
      })
      .error(function(response){
        console.log(response);
      });
  };
});

// controllers
myApp.controller('SignUpCtrl',['$scope','$http','SignUpService', function($scope, $http, SignUpService) {

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

myApp.controller('LogInCtrl',['$scope','$http','LogInService', function($scope, $http, LogInService){
  
  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    LogInService.logIn($scope.credentials);
  }
}]);
