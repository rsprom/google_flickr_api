(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['flickrAPI', '$window'];

    function MapCtrl(flickrAPI, $window) {
        var vm = this;
        vm.currentPhotoList;
        vm.textSearch = "Landscape";
        vm.getData = getData;
        vm.zoom = zoom;
        var currentPage = 1;
        var googleMarkers = new Array();
        var map = window.map;
        var infoWindow = new google.maps.InfoWindow;
        var closeZoomLevel = 10;
        var mapOptions = {
            center: { lat: 0, lng: 0 },
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        getData();

        //////////////////
        function getData() { 
            clearMarkers();

            //Set Map to Default
            map.panTo(mapOptions.center);
            map.setZoom(mapOptions.zoom);

            flickrAPI.getFlickrImgs(vm.textSearch, currentPage)
              .then(function (data) {
                  vm.currentPhotoList = data.photos.photo;
                  addMarkers(vm.currentPhotoList);
              });
        }

        function clearMarkers() {
            for (var i = 0; i < googleMarkers.length; i++) {
                googleMarkers[i].setMap(null);
            }

            googleMarkers.length = 0;
        }

        function addMarkers(photoList) {
            angular.forEach(photoList, function (photo) {
                var photoPosition = { lat: parseFloat(photo.latitude), lng: parseFloat(photo.longitude) };
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: photoPosition
                });

                var content = '<img class="photo" src="' + photo.url + '">'

                marker.addListener('click', function () {
                    map.panTo(photoPosition);
                    map.setZoom(closeZoomLevel);
                    infoWindow.open(map, marker);
                    infoWindow.setContent(content);
                });

                marker.photo = photo;

                googleMarkers.push(marker);
            })
        }

        function zoom(photo) {
            for (var i = 0; i < googleMarkers.length; i++) {
                if (photo.id == googleMarkers[i].photo.id) {
                    google.maps.event.trigger(googleMarkers[i], 'click');
                    break;
                }
            }
        }
    }
})();