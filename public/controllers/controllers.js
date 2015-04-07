var myApp = angular.module('myApp');

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
    $scope.credentials.dob = $scope.selectedMonth + ' ' + $scope.selectedDay + ' ' + $scope.selectedYear;
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
    LogInService.logIn($scope.credentials);
  };

  $scope.switchToSignUp = function(){
    $location.url('/SignUp');
  };

}]);

// TODO : move this to a service
myApp.controller('ProfileCtrl',['$scope', '$http', '$location', function($scope, $http, $location){
  // $scope.message = "default";
  console.log("We are in the profile");
  $http.get('/Profile')
    .success(function(response){
      $scope.message = response.message;
    });
    .error(function(response){
      // TODO : need a better way to restrict views in $routeProvider ?
      console.log("Can not access this!");
      $location.url('/LogIn');
    });
}]);