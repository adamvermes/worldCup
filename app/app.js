'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'teamController',
        'ngAnimate',
        'apiService'
    ])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

        $routeProvider.otherwise({redirectTo: '/worldCup'});
    }]);
