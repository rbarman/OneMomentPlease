var myApp = angular.module('myApp',['ngRoute','toaster']);

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
    otherwise({
      redirectTo:'/LogIn'
    });
}]);
