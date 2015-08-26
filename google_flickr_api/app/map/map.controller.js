(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['flickrAPI', '$window'];

    function MapCtrl(flickrAPI, $window) {
        var vm = this;
        vm.currentPhotoList;
        var googleMarkers = new Array();
        var map = window.map;
        var infoWindow = new google.maps.InfoWindow;
        var mapOptions = {
            center: { lat: 0, lng: 0 },
            zoom: 3
        }

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        getData();

        //////////////////
        function getData() {
            flickrAPI.getFlickrImgs(null,1)
              .then(function (data) {
                  addMarkers(data.photos.photo);
              });
        }

        function addMarkers(photoList) {
            angular.forEach(photoList, function (photo, key) {
                var photoPosition = { lat: parseFloat(photo.latitude), lng: parseFloat(photo.longitude) };
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: photoPosition
                });

                var content = '<img class="photo" src="' + photo.url + '">'

                marker.addListener('click', function () {
                    map.panTo(photoPosition);
                    map.setZoom(8);
                    infoWindow.open(map, marker);
                    infoWindow.setContent(content);
                });

                marker.photo = photo;

                googleMarkers.push(marker);
            })
        }
    }
})();