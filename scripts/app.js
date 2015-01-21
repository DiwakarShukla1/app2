'use strict';

/**
 * @ngdoc overview
 * @name coeducateApp
 * @description
 * # coeducateApp
 *
 * Main module of the application.
 */
angular
  .module('coeducateApp', [
    'ngResource',
    'ui.router',
    'ng-polymer-elements'
  ])

.value('user',{name:null})

.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/signin');

    $stateProvider
      .state('signin', {
        url: "/signin",
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .state('student', {
        url: "/student",
        templateUrl: 'views/student.html',
        controller: 'StudentCtrl'
      });


});
