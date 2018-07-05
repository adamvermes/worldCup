'use strict';

angular.module('teamController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/teams', {
        templateUrl: 'teams/view1.html',
        controller: 'teamsCtrl'
    });
}])

.controller('teamsCtrl', function($scope, $http, $location) {

    $http.get('https://randomuser.me/api?results=176').success(function(playerData) {

        $scope.teamPlayers = playerData.results;

        $scope.playersNames = [];

        $scope.playersFullNameGenerator = function() {
            for (let i = 0; i < $scope.teamPlayers.length; i++) {
                $scope.playersNames.push($scope.teamPlayers[i].name.first + " " + $scope.teamPlayers[i].name.last);
            }
        };
        $scope.playersFullNameGenerator();

        $scope.teams = [];
        $scope.teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
            "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
            "Australia", "Iceland", "Portugal", "Chile"];

        $scope.arrayOfGroups = new Array();

        $scope.generateGroupNames = function (numOfGroups) {
            for (let i = 0; i < numOfGroups; i+=2) {
                $scope.arrayOfGroups.push([$scope.teams[i], $scope.teams[i+1]]);
            }
        };

        $scope.generateTeams = function(teamNumbers) {
            for (let i = 0; i < teamNumbers; i++) {
                let team = {teamName: $scope.teamNames[i+1],
                    teamPlayers: []
                };
                $scope.teams.push(team);
            }
        };
        $scope.generateTeams(16);


        $scope.fillPlayers = function() {
            let slicedArray = [];
            for (let teamMember = 0, teamIndex = 0; teamMember < $scope.playersNames.length; teamMember+=11, teamIndex++) {
                slicedArray = $scope.playersNames.slice(teamMember, teamMember+11);
                $scope.teams[teamIndex].teamPlayers = slicedArray;
            }
        };
        $scope.fillPlayers();

        $scope.shuffle = function(array) {
            let i = 0;
            let j = 0;
            let temp = null;
            for (i = array.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1));
                temp = array[i];
                array[i] = array[j];
                array[j] = temp
            }
        };

        $scope.shuffle($scope.teams);

        $scope.generateGroupNames(16);
        console.log($scope.mapOfGroups);

        $scope.generateGroups = function(groupNumbers) {
            for (let i = 0; i < groupNumbers ; i++) {
                let group = {groupName: $scope.teamNames[i+1],
                    teamPlayers: []
                };
                $scope.teams.push(team);
            }
        };

        console.log("teams");
        console.log($scope.teams);
        console.log("arrayOfGroups");
        console.log($scope.arrayOfGroups);

    });
});
