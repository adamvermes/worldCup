'use strict';

teamController.directive("teams", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/teams.html',
        scope: {
            allTeams: '='
        }
    }
});