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

myApp.service('LogInService', function($http, $location, $window, toaster){

  this.logIn = function(credentials){
    console.log(credentials);
    $http.post('LogIn', credentials)
      .success(function(response){
        console.log("our token : ");
        console.log(response);
        $window.sessionStorage.token = response.token;
        $location.url('/Profile');
      })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "email and password do not match");
        delete $window.sessionStorage.token;
      });
  };

});


myApp.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});