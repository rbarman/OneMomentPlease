var myApp = angular.module('myApp');
myApp.controller('LogInCtrl',['$location','UserService', function($location, UserService){

  // this.credentials will store information regarding user log in
  this.credentials = {
    username:'',
    password:''
  };
  this.logIn = function() {
    // user can not click on log in button unless the form is valid
    UserService.logIn(this.credentials);
  };

}]);