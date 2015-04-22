var myApp = angular.module('myApp');
// TODO : add logIn to UserService?
myApp.service('UserService', function($http, $location, $window){

  this.getProfile = function(callback){
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
  };

  this.logOut = function(){
    delete $window.localStorage.token;
    $location.url('/LogIn');
    console.log("logging out");
  };

});