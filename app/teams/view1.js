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
        $scope.players = playerData.results;
        $scope.playersNames = [];
        $scope.playersFullNameGenerator = function() {
            for (let i = 0; i < $scope.players.length; i++) {
                $scope.playersNames.push($scope.players[i].name.first + " " + $scope.players[i].name.last);
            }
        };
        $scope.playersFullNameGenerator();
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

        $scope.teamList = $scope.teams;

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
            for (let teamMember = 0, teamIndex = 0; teamMember < $scope.playersNames.length; teamMember+=11, teamIndex++) {
                slicedArray = $scope.playersNames.slice(teamMember, teamMember+11);
                $scope.teams[teamIndex].players = slicedArray;
            }
        };

        // $scope.goToNextPhase = function() {
        //     $location.path('/schedule');
        // };

        // $scope.showTeams = function() {
        //     console.log("clicked");
        //    return $scope.teamNames;
        // };

        $scope.fillPlayers();

        $scope.generateGroups = function(groupNumbers) {
            for (let i = 1; i <= groupNumbers ; i++) {
                let group = {groupName: $scope.teamNames[i],
                    players: []
                };
                $scope.teams.push(team);
            }
        };

        console.log($scope.teamList);

        $scope.group1 = [];
        $scope.group1.push($scope.teams[0]);
        $scope.group1.push($scope.teams[1]);

        $scope.group2 = [];
        $scope.groups = {
            groupName: $scope.groupNames,
            teams: []
        };
    });
});
