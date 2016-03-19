/**
 * Created by gopal on 2/15/2016.
 */
(function() {
    "use strict";
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