var myApp = angular.module('myApp');

myApp.service('SignUpService',function($http, $location, toaster){
  this.signUp = function(credentials){
    console.log(credentials);
    $http.post('User/SignUp', credentials)
     .success(function(response){

        $location.url('/LogIn'); // temporary... 
       console.log(response);
    })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "Email is already in use");
    });
  };
});