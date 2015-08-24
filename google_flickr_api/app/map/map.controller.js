(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['flickrAPI', 'googleMapsAPI', '$window'];

    function MapCtrl(flickrAPI, googleMapsAPI, $window) {
        var vm = this;

        $window.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }
})();