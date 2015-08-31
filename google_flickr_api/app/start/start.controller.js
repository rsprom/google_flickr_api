(function () {
    'use strict';

    angular
        .module('flickrMapApp')
        .controller('StartCtrl', StartCtrl);

    StartCtrl.$inject = ['$location'];

    function StartCtrl($location) {
        var vm = this;
        vm.initialText;
        vm.search = search;

        var pathLocation;

        //////////////////
        function search() {
            $location.path('/map').search('query', vm.initialText);
        }
    }
})();