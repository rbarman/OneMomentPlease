var myApp = angular.module('myApp');
myApp.controller('VerifyCtrl', [ '$routeParams','VerifyService', function($routeParams, VerifyService){

  this.verificationCode = $routeParams.param;
  VerifyService.verifyCode(this.verificationCode);
}]);