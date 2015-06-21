var myApp = angular.module('myApp');
myApp.controller('ProfileCtrl',[ 'UserService', function(UserService){

  //TODO : make a failure callback,
  // UserService.getProfile currently goes to /LogIn on failure. This might not be wanted in future

  UserService.getProfile(function(response){
    console.log("success callback for UserService.getProfile()");
    console.log(response[0]);

    this.firstName = response[0].firstName;
    this.lastName = response[0].lastName;
    this.email = response[0].email;
    this.dob = response[0].dob;
    this.gender = response[0].gender;
  });

  this.logOut = function(){
    UserService.logOut();
  };

}]);