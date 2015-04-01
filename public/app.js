var myApp = angular.module('myApp',['ui.bootstrap','ngRoute']);

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
    otherwise({
      redirectTo:'/SignUp'
    });
}]);
