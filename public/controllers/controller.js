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

  this.logIn = function(credentials,callback){
    console.log(credentials);
    $http.post('LogIn', credentials)
      .success(function(response){
        console.log(response);
        // TEMPORARY : callback will set the the current logged in user to username.
        // try to return user and use a javascript promise in controller.
        callback();
      })
      .error(function(response){
        console.log(response);
      });
  };

  // TODO
  this.isLoggedIn = function(){

  };

});

// controllers
myApp.controller('MainCtrl',['$scope',function($scope){

  $scope.currentUser = null;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.printCurrentUser = function(){
    console.log($scope.currentUser);
  }

}]);

// all other controllers extend from MainCtrl
myApp.controller('SignUpCtrl',['$scope','SignUpService', function($scope, SignUpService) {

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

myApp.controller('LogInCtrl',['$scope','LogInService', function($scope, LogInService){
  
  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    LogInService.logIn($scope.credentials, function(){
      // this call back is only called on success...
        // TODO use javascript promise to be more elegant. 
      $scope.setCurrentUser($scope.credentials.username);
      $scope.printCurrentUser();
    });
  };
}]);
