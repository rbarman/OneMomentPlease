var myApp = angular.module('myApp');

myApp.controller('MainCtrl',['$scope',function($scope){

  $scope.currentUser = null;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.printCurrentUser = function(){
    console.log($scope.currentUser);
  };

}]);

// all other controllers extend from MainCtrl
myApp.controller('SignUpCtrl',['$scope','SignUpService', function($scope, SignUpService) {

	// $scope.credentials will store information regarding user sign up. 
  $scope.credentials = {
    firstName: '',
    lastName: '',
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
      $scope.setCurrentUser($scope.credentials.email);
      $scope.printCurrentUser();
    });
  };
}]);
