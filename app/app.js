'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'teamController',
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $routeProvider.otherwise({redirectTo: '/worldCup'});
    }]);
