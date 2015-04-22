var myApp = angular.module('myApp');
myApp.controller('VerifyCtrl', ['$scope', '$routeParams','VerifyService', function($scope, $routeParams, VerifyService){

  $scope.verificationCode = $routeParams.param;
  VerifyService.verifyCode($scope.verificationCode);
}]);