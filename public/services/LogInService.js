var myApp = angular.module('myApp');

myApp.service('LogInService', function($http, $location, $window, toaster){

  this.logIn = function(credentials){
    console.log(credentials);
    $http.post('User/LogIn', credentials)
      .success(function(response){
        console.log("our token : ");
        console.log(response);
        $window.localStorage.token = response.token;
        $location.url('/Profile');
      })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "email and password do not match");
        delete $window.localStorage.token;
      });
  };

});