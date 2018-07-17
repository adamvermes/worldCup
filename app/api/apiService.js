'use strict';

angular
    .module('apiService', ['ngResource'])

    .service('playersDataService', ['$resource', function($resource) {
        let playerData = function () {
            return $resource('https://randomuser.me/api?results=176', {
                query: {
                    method: "GET"
                }
            });
        };
        return {
            playerData: playerData
        }
    }]);


