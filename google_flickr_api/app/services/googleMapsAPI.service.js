(function () {
    'use strict';

    angular
      .module('flickrMapApp')
      .factory('googleMapsAPI', googleMapsAPI);

    googleMapsAPI.$inject = ['$http'];

    function googleMapsAPI($http) {

        return {
            getData: getData
        };

        function getData() {
            console.log("Data!");
        }
    }
})();