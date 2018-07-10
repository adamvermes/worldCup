'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'teamController',
   'scheduleController',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/worldCup'});
}]);
