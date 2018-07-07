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

        $scope.arrayOfGroup8 = [];
        $scope.arrayOfGroup4 = [];
        $scope.arrayOfGroup2 = [];
        $scope.arrayOfGroup1 = [];
        $scope.arrayOfGroup0 = [];

        $scope.generateNextGroup = function (numOfTeams, startingNum, previousArray, createdArray) {
            for (let i = 0; i < numOfTeams; i+=2) {
                createdArray.push({name: "Group " + ((i/2)+startingNum).toString(), teams: [previousArray[i], previousArray[i+1]]});
            }
        };

        $scope.generateGroup = function (numOfTeams, startingNum, previousArray, createdArray) {
            let advancedTeams = [];

            for (let i = 0; i < previousArray.length; i++) {
                advancedTeams.push(previousArray[i].teams[Math.floor(Math.random() + 0.5)]);
            }

            $scope.generateNextGroup(numOfTeams, startingNum, advancedTeams, createdArray);
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

        $scope.generateNextGroup(16, 1, $scope.teams, $scope.arrayOfGroup8);
        $scope.generateGroup(8, 9, $scope.arrayOfGroup8, $scope.arrayOfGroup4);
        $scope.generateGroup(4, 13, $scope.arrayOfGroup4, $scope.arrayOfGroup2);
        $scope.generateGroup(2, 15, $scope.arrayOfGroup2, $scope.arrayOfGroup1);
        $scope.generateGroup(2, 16, $scope.arrayOfGroup1, $scope.arrayOfGroup0);

        console.log("arrayOfGroup8");
        console.log($scope.arrayOfGroup8);
        console.log("arrayOfGroup4");
        console.log($scope.arrayOfGroup4);
        console.log("arrayOfGroup2");
        console.log($scope.arrayOfGroup2);
        console.log("arrayOfGroup1");
        console.log($scope.arrayOfGroup1);
        console.log("arrayOfGroup0");
        console.log($scope.arrayOfGroup0);

    });
});
