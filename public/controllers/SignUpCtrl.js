var myApp = angular.module('myApp');

myApp.controller('SignUpCtrl',['UserService', function(UserService) {

  // TODO : Find a better place to store this + make scope.years more dynamic(?)
  this.months = ["Jan.", "Feb.", "Mar.", "Apr.", "May" , "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  this.days = [];
  for(i = 1; i < 32; i++)
    this.days.push(i);
  this.years = [];
  for(i = 1900; i < 2015; i++)
    this.years.push(i);

	// this.credentials will store information regarding user sign up. 
  this.credentials = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    question:'',
    answer:''
  };

	this.createNewAccount = function(){
    this.credentials.dob = this.selectedMonth + ' ' + this.selectedDay + ' ' + this.selectedYear;
    UserService.signUp(this.credentials);
	};
}]);