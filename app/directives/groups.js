teamController.directive("groups", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/groups.html',
        scope: {
            arrayOfGroups: "="
        }
    }
});