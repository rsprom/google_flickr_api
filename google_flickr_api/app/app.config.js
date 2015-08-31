(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/start/start.html',
                controller: 'StartCtrl',
                controllerAs: 'vm'
            })
            .when('/map', {
                templateUrl: 'app/map/map.html',
                controller: 'MapCtrl',
                controllerAs: 'vm',
                reloadOnSearch: false
            });
    }

})();