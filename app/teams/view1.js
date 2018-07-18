'use strict';

let teamController = angular.module('teamController', ['ngRoute'])

    teamController.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/worldCup', {
            templateUrl: 'teams/view1.html',
            controller: 'teamsCtrl'
        });
    }]);

    teamController.controller('teamsCtrl', ['$scope', 'playersDataService', '$interval', function($scope, playersDataService, $interval) {

        let gameIsOn;
        let counter = 0;
        let promise;

        $scope.teams = [];
        $scope.teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
            "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
            "Australia", "Iceland", "Portugal", "Chile"];
        $scope.playersNames = [];
        $scope.arrayOfGroups = [];
        $scope.arrayOfGroup8 = [];
        $scope.arrayOfGroup4 = [];
        $scope.arrayOfGroup2 = [];
        $scope.arrayOfGroup1 = [];
        $scope.arrayOfGroup0 = [];

        $scope.simulateGame = function() {
            gameIsOn = true;
            if (gameIsOn === true) {
                $scope.generateTeams(16);
                shuffle($scope.teams);
                $scope.fillPlayers();
                promise = $interval(generateRounds, 1500);
                gameIsOn = false;
            } else {
                return 0;
            }
        };

        playersDataService.playerData().get((function (playerData) {
            $scope.playersFullNameGenerator(playerData.results);
        }));

        $scope.playersFullNameGenerator = function(playerData) {
            for (let i = 0; i < playerData.length; i++) {
                $scope.playersNames.push(playerData[i].name.first + " " + playerData[i].name.last);
            }
        };

        $scope.arrayOfGroups.push($scope.arrayOfGroup8, $scope.arrayOfGroup4, $scope.arrayOfGroup2, $scope.arrayOfGroup1, $scope.arrayOfGroup0);

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

        $scope.startGame = function () {
            $scope.simulateGame();
            gameIsOn = false;
        };

        $scope.stopGame = function() {
            $interval.cancel(promise);
        };

        $scope.resetGame = function () {
            $scope.clearGame();
        };

        $scope.clearGame = function() {
            $scope.arrayOfGroup8.length = 0;
            $scope.arrayOfGroup4.length = 0;
            $scope.arrayOfGroup2.length = 0;
            $scope.arrayOfGroup1.length = 0;
            $scope.arrayOfGroup0.length = 0;
            counter = 0;
            gameIsOn = true;
            $interval.cancel(promise);
        };

        $scope.alertWinner = function() {
            alert("Tournament Winner: " +  $scope.arrayOfGroup0[0].teams[0].teamName);
        };

        let shuffle = function(array) {
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

        let generateRounds = function () {
            switch (counter) {
                case 0:
                    $scope.generateGroupNames(16, 1, $scope.teams, $scope.arrayOfGroup8);
                    counter++;
                    break;
                case 1:
                    $scope.generateAdvancedTeams(8, 9, $scope.arrayOfGroup8, $scope.arrayOfGroup4);
                    counter++;
                    break;
                case 2:
                    $scope.generateAdvancedTeams(4, 13, $scope.arrayOfGroup4, $scope.arrayOfGroup2);
                    counter++;
                    break;
                case 3:
                    $scope.generateAdvancedTeams(2, 15, $scope.arrayOfGroup2, $scope.arrayOfGroup1);
                    counter++;
                    break;
                case 4:
                    $scope.generateAdvancedTeams(2, 16, $scope.arrayOfGroup1, $scope.arrayOfGroup0);
                    counter++;
                    break;
                default:
                    $interval.cancel(promise);
            }
        };
    }]);


