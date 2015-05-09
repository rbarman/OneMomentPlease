var myApp = angular.module('myApp');

myApp.service('LogInService', function($http, $location, $window, toaster){

  this.logIn = function(credentials){
    console.log(credentials);
    $http.post('User/LogIn', credentials)
      .success(function(response){
        console.log("our token : ");
        console.log(response);
        try{
          $window.localStorage.token = response.token;
          $location.url('/Profile');
        } catch(e){
          alert('OMP is currently not working for Private Browsing on Safari!\n\nPlease turn off Private Browsing');
        }
      })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "email and password do not match");
        delete $window.localStorage.token;
      });
  };
  
});