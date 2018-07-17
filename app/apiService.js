'use strict';

angular
    .module('gameController', [])
    .factory('dataService', dataService);

dataService.$inject = ['$http', 'logger'];

function dataService($http, logger) {
    return {
        getPlayers: getPlayers
    };

    function getPlayers() {
        return $http.get('https://randomuser.me/api?results=176')
            .then(getPlayersComplete)
            .catch(getPlayersFailed);


        function getPlayersComplete(response) {
            console.log(response.data.results);
            return response.data.results;
        }

        function getPlayersFailed(error) {
            logger.error('XHR Failed for getPlayers.' + error);
        }
    }
}
