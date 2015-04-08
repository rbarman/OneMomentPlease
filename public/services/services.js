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

// TODO : add logIn to UserService?
myApp.service('UserService', function($http, $location, $window){

  this.getProfile = function(callback){
    console.log("finna get the profile!");
    $http.get('/Profile')
    .success(function(data, status, headers, config){
      callback(data);
    })
    .error(function(response){
      console.log("failure");
      $location.url('/LogIn'); 
      // TODO : make setting the location a part of a future failure callback on ProfilCtrl?
      // UserService.getProfile() should ideally just get the profile without business logic.
    });
  }

  this.logOut = function(){
    delete $window.localStorage.token;
    $location.url('/LogIn');
    console.log("logging out");
  };

});

myApp.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
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

myApp.service('VerifyService', function($http){

  this.verifyCode = function(verificationCode){

    console.log("in verifyService");

    $http.post('Verify',verificationCode)
      .success(function(response){
        console.log(response);
      })
      .error(function(response){
        console.log(response);
      });
    };
});