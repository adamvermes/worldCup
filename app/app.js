'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'teamController',
         'scheduleController',
         'myApp.version'
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $routeProvider.otherwise({redirectTo: '/worldCup'});
    }]);
