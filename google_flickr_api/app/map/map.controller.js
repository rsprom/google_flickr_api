(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['flickrAPI', '$window', '$location', '$anchorScroll'];

    function MapCtrl(flickrAPI, $window, $location, $anchorScroll) {
        var vm = this;
        vm.currentPhotoList;
        vm.getData = getData;
        vm.getNext = getNext;
        vm.isActive = isActive;
        vm.zoom = zoom;
        var activePhoto = null;
        var currentPage = 1;
        var googleMarkers = new Array();
        var map = window.map;
        var infoWindow = new google.maps.InfoWindow;
        var closeZoomLevel = 10;
        var mapOptions = {
            center: { lat: 0, lng: 0 },
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        vm.textSearch = $location.search().query;
        getData();

        //////////////////
        function getData() {
            $location.path('/map').search('query', vm.textSearch);
            clearMarkers();

            //Set Map to Default
            map.panTo(mapOptions.center);
            map.setZoom(mapOptions.zoom);

            flickrAPI.getFlickrImgs(vm.textSearch, currentPage)
              .then(function (data) {
                  vm.currentPhotoList = data.photos.photo;

                  if (vm.currentPhotoList.length > 0) {
                      addMarkers(vm.currentPhotoList);
                      scrollTo(vm.currentPhotoList[0].id);
                  }
              });
        }

        function getNext() {
            currentPage = ++currentPage;
            getData();
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

                var content = '<a href="' + 'https://www.flickr.com/photos/' + photo.owner + '/' + photo.id + '" target="_blank">' +
                    '<img class="photo" src="' + photo.url + '">' +
                    '</a>';

                marker.addListener('click', function () {
                    vm.activePhoto = photo;
                    map.panTo(photoPosition);
                    map.setZoom(closeZoomLevel);
                    infoWindow.open(map, marker);
                    infoWindow.setContent(content);
                    scrollTo(photo.id);
                    vm.isActive(photo.id);
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

        function isActive(photoId) {
            if (vm.activePhoto != null) {
                return vm.activePhoto.id == photoId;
            }
        }

        function scrollTo(photoId) {
            $location.hash(photoId);
            $anchorScroll();
        }
    }
})();