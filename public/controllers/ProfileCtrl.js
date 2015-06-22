var myApp = angular.module('myApp');
myApp.controller('ProfileCtrl',['UserService', function(UserService){

  var that = this; // for some reason binding with this does not work in getProfile callback

  //TODO : make a failure callback,
  // UserService.getProfile currently goes to /LogIn on failure. This might not be wanted in future

  UserService.getProfile(function(response){
    console.log("success callback for UserService.getProfile()");
    console.log(response[0]);

    that.firstName = response[0].firstName;
    that.lastName = response[0].lastName;
    that.email = response[0].email;
    that.dob = response[0].dob;
    that.gender = response[0].gender;
  });

  this.logOut = function(){
    UserService.logOut();
  };

}]);