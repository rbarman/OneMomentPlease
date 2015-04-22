var myApp = angular.module('myApp',['ngRoute','toaster']);

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/SignUp',{
      templateUrl:'views/signup.html',
      controller: 'SignUpCtrl'
    }).
    when('/LogIn',{
      templateUrl:'views/login.html',
      controller: 'LogInCtrl'
    }).
    when('/Profile',{
      templateUrl:'views/profile.html',
      controller: 'ProfileCtrl'
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
