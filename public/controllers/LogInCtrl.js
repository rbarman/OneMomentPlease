var myApp = angular.module('myApp');
myApp.controller('LogInCtrl',['$scope','$location','UserService', function($scope, $location, UserService){

  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    if ($scope.userForm.$valid) {
        console.log("form to login is valid");
        UserService.logIn($scope.credentials);
      }
  };

  $scope.switchToSignUp = function(){
    $location.url('/SignUp');
  };

}]);