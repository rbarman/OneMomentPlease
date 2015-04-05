var myApp = angular.module('myApp');

myApp.controller('MainCtrl',['$scope',function($scope){

  $scope.currentUser = null;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.printCurrentUser = function(){
    console.log($scope.currentUser);
  };

}]);

// all other controllers extend from MainCtrl
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
    gender: ''
  };

	$scope.createNewAccount = function(){
    console.log($scope.selectedMonth);
    console.log($scope.selectedDay);
    console.log($scope.selectedYear);
    $scope.credentials.dob = $scope.selectedMonth + ' ' + $scope.selectedDay + ' ' + $scope.selectedYear;
    console.log($scope.credentials.dob);
    SignUpService.signUp($scope.credentials);
	};
}]);

myApp.controller('LogInCtrl',['$scope','$location','LogInService', function($scope, $location, LogInService){
  
  // $scope.credentials will store information regarding user log in
  $scope.credentials = {
    username:'',
    password:''
  };
  $scope.logIn = function() {
    LogInService.logIn($scope.credentials, function(){
      // this call back is only called on success...
        // TODO use javascript promise to be more elegant. 
      $scope.setCurrentUser($scope.credentials.email);
      $scope.printCurrentUser();
      $location.url('/Profile');
    });
  };

  $scope.switchToSignUp = function(){
    $location.url('/SignUp');
  };

}]);

myApp.controller('ProfileCtrl',['$scope', function($scope){
  
}]);