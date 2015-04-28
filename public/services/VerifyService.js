var myApp = angular.module('myApp');

myApp.service('VerifyService', function($http){

  this.verifyCode = function(verificationCode){

    console.log("in verifyService");

    $http.post('User/Verify',{verificationCode : verificationCode})
      .success(function(response){
        console.log(response);
      })
      .error(function(response){
        console.log(response);
      });
    };
});