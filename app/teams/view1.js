'use strict';

angular.module('teamController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/teams', {
        templateUrl: 'teams/view1.html',
        controller: 'teamsCtrl'
    });
}])

.controller('teamsCtrl', function($scope, $http, $log, $location) {

    $http.get('https://randomuser.me/api?results=176').success(function(playerData) {
        $scope.players = playerData.results;
        $scope.teams = [];
        $scope.teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
            "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
            "Australia", "Iceland", "Portugal"];

        $scope.groupNames = [];
        $scope.generateGroupNames = function (number) {
            for (let i = 1; i < number; i++) {
                let group = "Group " + i;
                $scope.groupNames.push(group);
            }
        };

        $scope.generateGroupNames(16);
        console.log($scope.groupNames);

        $scope.teamList = $scope.teams;
        $log.log(playerData);

        $scope.generateTeams = function(teamNumbers) {
            for (let i = 1; i <= teamNumbers; i++) {
                let team = {teamName: $scope.teamNames[i],
                    players: []
                };
                $scope.teams.push(team);
            }
        };
        $scope.generateTeams(16);

        $scope.fillPlayers = function() {
            let slicedArray = [];
            for (let teamMember = 0, teamIndex = 0; teamMember < $scope.players.length; teamMember+=11, teamIndex++) {
                slicedArray = $scope.players.slice(teamMember, teamMember+11);
                $scope.teams[teamIndex].players = slicedArray;
            }
        };
        $scope.goToNextPhase = function() {
            $location.path('/schedule');
        };
        $scope.fillPlayers();
        $log.log($scope.teams);

        $scope.generateGroups = function(groupNumbers) {
            for (let i = 1; i <= groupNumbers ; i++) {
                let group = {groupName: $scope.teamNames[i],
                    players: []
                };
                $scope.teams.push(team);
            }
        };

        $scope.group1 = [];
        $scope.group1.push($scope.teams[0]);
        $scope.group1.push($scope.teams[1]);
    });
});
