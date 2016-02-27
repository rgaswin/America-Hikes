(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {

        $scope.Logout = Logout;

        function Logout() {
            $rootScope.loggedInUser = null;
            $location.url("/home");

        }

    }
})();