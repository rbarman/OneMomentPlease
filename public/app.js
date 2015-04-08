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
