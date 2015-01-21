'use strict';

/**
 * @ngdoc function
 * @name coeducateApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the coeducateApp
 */
angular.module('coeducateApp')
  .controller('SigninCtrl', function ($scope,user,$location) {
    
  		function validate(_username,_password){
  			if(_username.split(" ")[0] === _password){
  				return true;
  			}
  			return false;
  		}

  		$scope.login = function(){
  			if(validate($scope.username,$scope.password)){
  				user.name = $scope.username;
  				$location.path('/student');			
  			}
  		}
  });
