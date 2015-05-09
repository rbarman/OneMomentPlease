var myApp = angular.module('myApp');
myApp.controller('LogInCtrl',['$scope','$location','LogInService', function($scope, $location, LogInService){

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