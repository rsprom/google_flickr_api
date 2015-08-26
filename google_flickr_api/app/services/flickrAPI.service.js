(function () {
    'use strict';

    angular
      .module('flickrMapApp')
      .factory('flickrAPI', flickrAPI);

    flickrAPI.$inject = ['$http'];

    function flickrAPI($http) {
        var flickrAPIKey = "0f40131d0253a205094f298e92f96ad3";
        var defaultSearch = "landscape";
        var perPage = 20;
        var url_size = "url_m";

        return {
            getFlickrImgs: getFlickrImgs
        };

        function getFlickrImgs(newSearch, page) {
            if (newSearch != null) {
                defaultSearch = newSearch;
            }

            return $http({
                method: 'GET',
                params: {
                    api_key: flickrAPIKey,
                    text: defaultSearch,
                    safe_search: 1,
                    sort: "relevance",
                    extras: url_size + ",description" + ",geo",
                    format: "json",
                    has_geo: 1,
                    per_page: perPage,
                    page: page,
                    nojsoncallback: "?"
                },
                url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search'
            })
              .then(getFlickrImgsComplete)
              .catch(getFlickrImgsFailed);

            function getFlickrImgsComplete(response) {
                angular.forEach(response.data.photos.photo, function (value, key) {
                    value.url = value[url_size];
                });

                return response.data;
            }

            function getFlickrImgsFailed(error) {
                console.log(error);
            }
        }
    }
})();