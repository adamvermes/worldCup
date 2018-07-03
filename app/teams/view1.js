'use strict';

var view1Controller = angular.module('view1Controller', ['ngRoute'])

view1Controller.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teams', {
    templateUrl: 'teams/view1.html',
    controller: 'View1Ctrl'
  });
}])

let teams = [];

var teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
    "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
    "Australia", "Denmark", "Iceland", "Portugal"];

view1Controller.controller('View1Ctrl', function($scope, $http) {
    $http.get('https://randomuser.me/api?results=176').success(function(playerData) {
        $scope.players = playerData;
        console.log("playerData: ")
        console.log(playerData);
        $scope.teamList = teams;
        console.log(playerData);

        function generateTeams(teamNumbers) {
            for (let i = 1; i <= teamNumbers ; i++) {
                let team = {teamName: teamNames[i],
                    players: []
                }
                teams.push(team);
            }
        }
        generateTeams(16);

        function fillPlayers() {
            var slicedArray = [];
            for (let teamMember = 0, teamIndex = 0; teamMember < playerData.length; teamMember+=11, teamIndex++) {
                slicedArray = playerData.results.slice(teamMember, teamMember+11);
                teams[teamIndex].players = slicedArray;
            }
        }
        fillPlayers();
        console.log(teams);
    });
});
//
// let teams = [];
// var teamNames = ["France", "Argentina", "Brazil", "Croatia", "Spain", "England",
//     "Belgium", "Hungary", "Japan", "Columbia", "Mexico", "Germany", "Serbia",
//     "Australia", "Denmark", "Iceland", "Portugal"];
//
// function generateTeams(teamNumbers) {
//     for (let i = 1; i <= teamNumbers ; i++) {
//         let team = {teamName: teamNames[i],
//             players: []
//         }
//         teams.push(team);
//     }
// }
// generateTeams(16);
// console.log(teams);
//
// // function fillPlayers() {
// //     var slicedArray = [];
// //     for (let teamMember = 0, teamIndex = 0; teamMember < $scope.players.length; teamMember+=11, teamIndex++) {
// //         slicedArray = $scope.players.results.slice(teamMember, teamMember+11);
// //         teams[teamIndex].players = slicedArray;
// //     }
// // }
// // fillPlayers();
