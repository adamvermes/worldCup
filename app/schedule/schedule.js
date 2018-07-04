'use strict';

angular.module('scheduleController', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/schedule', {
            templateUrl: 'schedule/schedule.html',
            controller: 'ScheduleCtrl'
        });
    }])

    .controller('ScheduleCtrl', function($scope, $http, $log, $location) {
        // $scope.group1 = [];
        // group1.push();
    });
