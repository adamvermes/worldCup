'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'teamController',
        'ngAnimate'
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $routeProvider.otherwise({redirectTo: '/worldCup'});
    }]);
