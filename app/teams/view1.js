'use strict';

angular.module('teamController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/worldCup', {
        templateUrl: 'teams/view1.html',
        controller: 'teamsCtrl'
    });
}])

.controller('teamsCtrl', function($scope, $http) {



    $scope.simulateGame = function() {
        $scope.playersFullNameGenerator();
        $scope.generateTeams(16);
        $scope.shuffle($scope.teams);
        $scope.fillPlayers();
        $scope.generateAllGroups();
    };


    $http.get('https://randomuser.me/api?results=176').success(function(playerData) {

        $scope.teamPlayers = playerData.results;

        $scope.playersNames = [];

        $scope.playersFullNameGenerator = function() {
            for (let i = 0; i < $scope.teamPlayers.length; i++) {
                $scope.playersNames.push($scope.teamPlayers[i].name.first + " " + $scope.teamPlayers[i].name.last);
            }
        };

        $scope.teams = [];

        $scope.teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
            "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
            "Australia", "Iceland", "Portugal", "Chile"];

        $scope.arrayOfGroup8 = [];
        $scope.arrayOfGroup4 = [];
        $scope.arrayOfGroup2 = [];
        $scope.arrayOfGroup1 = [];
        $scope.arrayOfGroup0 = [];

        $scope.generateGroupNames = function (numOfTeams, startingNum, previousArray, createdArray) {
            for (let i = 0; i < numOfTeams; i+=2) {
                createdArray.push({name: "Group " + ((i/2)+startingNum).toString(), teams: [previousArray[i], previousArray[i+1]]});
            }
        };

        $scope.generateAdvancedTeams = function (numOfTeams, startingNum, previousArray, createdArray) {
            let advancedTeams = [];

            for (let i = 0; i < previousArray.length; i++) {
                advancedTeams.push(previousArray[i].teams[Math.floor(Math.random() + 0.5)]);
            }

            $scope.generateGroupNames(numOfTeams, startingNum, advancedTeams, createdArray);
        };

        $scope.generateAllGroups = function() {
            $scope.generateGroupNames(16, 1, $scope.teams, $scope.arrayOfGroup8);
            $scope.generateAdvancedTeams(8, 9, $scope.arrayOfGroup8, $scope.arrayOfGroup4);
            $scope.generateAdvancedTeams(4, 13, $scope.arrayOfGroup4, $scope.arrayOfGroup2);
            $scope.generateAdvancedTeams(2, 15, $scope.arrayOfGroup2, $scope.arrayOfGroup1);
            $scope.generateAdvancedTeams(2, 16, $scope.arrayOfGroup1, $scope.arrayOfGroup0);
        };

        $scope.generateTeams = function(teamNumbers) {
            if ($scope.teams.length === 16) {
               return 0;
            } else {
                for (let i = 0; i < teamNumbers; i++) {
                    let team = {teamName: $scope.teamNames[i+1],
                        teamPlayers: []
                    };
                    $scope.teams.push(team);
                }
            }
        };

        $scope.fillPlayers = function() {
            for (let i = 0; i < 10 ; i++) {
                if ($scope.teams[i].teamPlayers.length < 1) {
                    let slicedArray = [];
                    for (let teamMember = 0, teamIndex = 0; teamMember < $scope.playersNames.length; teamMember+=11, teamIndex++) {
                        slicedArray = $scope.playersNames.slice(teamMember, teamMember+11);
                        $scope.teams[teamIndex].teamPlayers = slicedArray;
                    }
                } else {
                    return;
                }
            }
        };

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

        $scope.alertWinner = function() {
            alert("Tournament Winner: " +  $scope.arrayOfGroup0[0].teams[0].teamName);
        };

        $scope.clearGroupArrays = function() {
            $scope.arrayOfGroup8.length = 0;
            $scope.arrayOfGroup4.length = 0;
            $scope.arrayOfGroup2.length = 0;
            $scope.arrayOfGroup1.length = 0;
            $scope.arrayOfGroup0.length = 0;
        };

        $scope.startGame = function () {
            $scope.simulateGame();
        };

        $scope.resetGame = function () {
            $scope.clearGroupArrays();
            // counter = 0;
        };

        // let interval;
        // let counter = 0;

        // let gamePlay = function() {
        //     switch (counter) {
        //         case 0:
        //             interval = window.setTimeout($scope.generateGroupNames(16, 1, $scope.teams, $scope.arrayOfGroup8), 1500);
        //             counter++;
        //             break;
        //         case 1:
        //             interval = window.setTimeout($scope.generateAdvancedTeams(8, 9, $scope.arrayOfGroup8, $scope.arrayOfGroup4), 3000);
        //             counter++;
        //             break;
        //         case 2:
        //             interval = window.setTimeout($scope.generateAdvancedTeams(4, 13, $scope.arrayOfGroup4, $scope.arrayOfGroup2), 4500);
        //             counter++;
        //             break;
        //         case 3:
        //             interval = window.setTimeout($scope.generateAdvancedTeams(2, 15, $scope.arrayOfGroup2, $scope.arrayOfGroup1), 6000);
        //             counter++;
        //             break;
        //         case 4:
        //             interval = window.setTimeout($scope.generateAdvancedTeams(2, 16, $scope.arrayOfGroup1, $scope.arrayOfGroup0), 7500);
        //             counter++;
        //             break;
        //         default:
        //             console.log("default, counter:  " + counter);
        //     }
        // };

    });
});
