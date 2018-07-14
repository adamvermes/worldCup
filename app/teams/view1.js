'use strict';

angular
    .module('teamController', ['ngRoute'])

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

            $scope.arrayOfGroups = [
            ];

            $scope.arrayOfGroup8 = [];
            $scope.arrayOfGroup4 = [];
            $scope.arrayOfGroup2 = [];
            $scope.arrayOfGroup1 = [];
            $scope.arrayOfGroup0 = [];

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
                console.log($scope.arrayOfGroups);
            };

            $scope.resetGame = function () {
                $scope.clearGroupArrays();
            };
        });

        $scope.person = {
            name: "Adam",
            address: "Vaci ut",
            city: "Budapest",
            zip: "1150"
        };

        $scope.formattedAddress = function(person) {
            return person.address + ", " + person.city + ", " + person.zip;
        };
    })

    .directive("group", function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/group.html',
            scope: {
                arrayOfGroups: "="
            }
        }
    })

    .directive("matchup", function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/matchup.html',
            scope: {
                match: "="
            }
        }
    })

    .directive("team", function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/team.html',
            scope: {
                team: "="
            }
        }
    });

    // .directive("searchResult", function () {
    //     return {
    //         restrict: 'AE',
    //         templateUrl: 'directives/searchresult.html',
    //         replace: true,
    //         scope: {
    //             personObject: "=",
    //             formattedAddressFunction: "&"
    //         }
    //     }
    // })



