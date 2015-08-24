(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/map/map.html',
                controller: 'MapCtrl',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: "/"});
    }

})();