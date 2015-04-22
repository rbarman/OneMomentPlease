var myApp = angular.module('myApp');
myApp.controller('LogInCtrl',['$scope','$location','LogInService','UserService', function($scope, $location,LogInService, UserService){
  
  // This check is not super necessary as ideally a logged in user would not go to the log in page
  UserService.getProfile(function(response){
    // if successful in getting profile, Our token is valid
    // redirect to /Profile because it does not make sense to go to log in page if already logged in. 
    $location.url('/Profile');
  });
  
  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    if ($scope.userForm.$valid) {
        console.log("form to login is valid");
        LogInService.logIn($scope.credentials);
      }
  };

  $scope.switchToSignUp = function(){
    $location.url('/SignUp');
  };

}]);