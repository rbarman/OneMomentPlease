var myApp = angular.module('myApp');

myApp.service('SignUpService',function($http, $location, toaster){
  this.signUp = function(credentials){
    console.log(credentials);
    $http.post('/SignUp', credentials)
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

myApp.service('LogInService', function($http, toaster){

  this.logIn = function(credentials,callback){
    console.log(credentials);
    $http.post('LogIn', credentials)
      .success(function(response){
        console.log(response);
        // TEMPORARY : callback will set the the current logged in user to username.
        // try to return user and use a javascript promise in controller.
        callback();
      })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "email and password do not match");
      });
  };

  // TODO
  this.isLoggedIn = function(){
    
  };

});