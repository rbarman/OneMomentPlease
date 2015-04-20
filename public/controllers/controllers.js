var myApp = angular.module('myApp');

myApp.controller('SignUpCtrl',['$scope','SignUpService', function($scope, SignUpService) {

  // TODO : Find a better place to store this + make scope.years more dynamic(?)
  $scope.months = ["Jan.", "Feb.", "Mar.", "Apr.", "May" , "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  $scope.days = [];
  for(i = 1; i < 32; i++)
    $scope.days.push(i);
  $scope.years = [];
  for(i = 1900; i < 2015; i++)
    $scope.years.push(i);

	// $scope.credentials will store information regarding user sign up. 
  $scope.credentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    question:'',
    answer:''
  };

	$scope.createNewAccount = function(){
    $scope.credentials.dob = $scope.selectedMonth + ' ' + $scope.selectedDay + ' ' + $scope.selectedYear;
    SignUpService.signUp($scope.credentials);
	};
}]);

myApp.controller('LogInCtrl',['$scope','$location','LogInService','UserService', function($scope, $location,LogInService, UserService){
  
  // This check is not super necessary as ideally a logged in user would not go to the log in page
  UserService.getProfile(function(response){
    // if successful in getting profile, Our token is valid
    // redirect to /Profile because it does not make sense to go to log in page if already logged in. 
    $location.url('/Profile');
  });
  
  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    LogInService.logIn($scope.credentials);
  };

  $scope.switchToSignUp = function(){
    $location.url('/SignUp');
  };

}]);

myApp.controller('ProfileCtrl',['$scope', 'UserService', function($scope, UserService){
  $scope.message = "default";

  //TODO : make a failure callback,
  // UserService.getProfile currently goes to /LogIn on failure. This might not be wanted in future

  UserService.getProfile(function(response){
    console.log("success callback");
    console.log(response[0]);

    $scope.firstName = response[0].firstName;
    $scope.lastName = response[0].lastName;
    $scope.email = response[0].email;
    $scope.dob = response[0].dob;
    $scope.gender = response[0].gender;
  });

  $scope.logOut = function(){
    UserService.logOut();
  };

}]);

myApp.controller('VerifyCtrl', ['$scope', '$routeParams','VerifyService', function($scope, $routeParams, VerifyService){

  $scope.verificationCode = $routeParams.param;
  VerifyService.verifyCode($scope.verificationCode);

}]);