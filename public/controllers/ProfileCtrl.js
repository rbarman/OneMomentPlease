var myApp = angular.module('myApp');
myApp.controller('ProfileCtrl',['$scope', 'UserService', function($scope, UserService){
  $scope.message = "default";

  //TODO : make a failure callback,
  // UserService.getProfile currently goes to /LogIn on failure. This might not be wanted in future

  UserService.getProfile(function(response){
    console.log("success callback for UserService.getProfile()");
    console.log(response[0]);

    $scope.firstName = response[0].firstName;
    $scope.lastName = response[0].lastName;
    $scope.email = response[0].email;
    $scope.dob = response[0].dob;
    $scope.gender = response[0].gender;
  });

  $scope.logOut = function(){
    UserService.logOut();
  };

}]);