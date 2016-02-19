(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.isactive = isActive;
        function isActive(location) {
            return $location.url = location;
        }
    }
})();