teamController.directive("matchup", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/matchup.html',
        scope: {
            match: "="
        }
    }
});
