var myApp = angular.module('myApp',['ngRoute','toaster']);

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    // all restricted views will need to have the checkForToken resolve
      // checking token by seeing if we can GET /Restricted
      // currently on failure, redirecting to /LogIn view, can change to something later. 
    when('/Restricted',{
      templateUrl:'views/restricted.html',
      controller:'RestrictedCtrl',
      resolve : {
        checkForToken: function($http, $location, toaster){
          $http.get('/Restricted')
          .success(function(response){
            console.log("valid token");
            $location.url('/Restricted');
          })
          .error(function(response){
            console.log("invalid token");
            toaster.pop('error', "Failure", "You must be logged in to access Restricted");
            $location.url('/LogIn');

          })
        }
      }
    }).
    when('/SignUp',{
      templateUrl:'views/signup.html',
      controller: 'SignUpCtrl'
    }).
    when('/LogIn',{
      templateUrl:'views/login.html',
      controller: 'LogInCtrl',
      resolve : {
        checkForToken: function($http, $location){
          $http.get('/Restricted')
          .success(function(response){
            console.log("valid token");
            $location.url('/Profile');
          })
          .error(function(response){
            console.log("invalid token");
          })
        }
      }
    }).
    when('/Profile',{
      templateUrl:'views/profile.html',
      controller: 'ProfileCtrl',
        resolve : {
        checkForToken: function($http, $location, toaster){
          $http.get('/Restricted')
          .success(function(response){
            console.log("valid token");
            $location.url('/Profile');
          })
          .error(function(response){
            console.log("invalid token");
            toaster.pop('error', "Failure", "You must be logged in to access Profile");
            $location.url('/LogIn');
          })
        }
      }
    }).
    when('/Verify/:param', {
      templateUrl:'views/verify.html',
      controller: 'VerifyCtrl'
    }).
    otherwise({
      redirectTo:'/LogIn'
    });
}]);

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
