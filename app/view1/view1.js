'use strict';

var view1Controller = angular.module('view1Controller', ['ngRoute'])

view1Controller.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

view1Controller.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.name = "Hungary";
  $scope.players = {
    playerNames: ["Adam", "Vermes"]
  }

}]);