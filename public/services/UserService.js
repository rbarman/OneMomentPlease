var myApp = angular.module('myApp');

myApp.service('UserService', function($http, $location, $window){

  this.getProfile = function(callback){
    $http.get('User/Profile')
    .success(function(data, status, headers, config){
      callback(data);
    })
    .error(function(response){
      console.log("failure");
      $location.url('/LogIn'); 
      // TODO : make setting the location a part of a future failure callback on ProfilCtrl?
    });
  };

  this.logOut = function(){
    delete $window.localStorage.token;
    $location.url('/LogIn');
    console.log("logging out");
  };

  this.signUp = function(credentials){
    console.log(credentials);
    $http.post('User/SignUp', credentials)
     .success(function(response){

        $location.url('/LogIn'); // temporary... 
       console.log(response);
    })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "Email is already in use");
    });
  };

  this.logIn = function(credentials){
    console.log(credentials);
    $http.post('User/LogIn', credentials)
      .success(function(response){
        console.log("our token : ");
        console.log(response);
        try{
          $window.localStorage.token = response.token;
          $location.url('/Profile');
        } catch(e){
          alert('OMP is currently not working for Private Browsing on Safari!\n\nPlease turn off Private Browsing');
        }
      })
      .error(function(response){
        console.log(response);
        toaster.pop('error', "Failure", "email and password do not match");
        delete $window.localStorage.token;
      });
  };

});