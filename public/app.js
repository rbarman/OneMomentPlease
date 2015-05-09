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
      controller: 'LogInCtrl',
      // checking local storage for a token
      // Here because controllers should not need to know about checking for tokens
      resolve : {
        checkForToken: function($location){
          if(window.localStorage.token == null){
            console.log("Client does not have a token");
          }
          else{
            console.log("Client has a token");
            $location.path('/Profile');
          }
        }
      }
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

myApp.controller('ctrl',['$scope','$location', function($scope, $location){
  $scope.switchToProfile = function(){
    $location.url('/Profile');
  }
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
