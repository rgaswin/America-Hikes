/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.Logout = Logout;

        function Logout() {
            UserService.logoutUser().then(function (response) {
                $rootScope.loggedInUser = null;
                $location.url("/home");
            });
        }
    }
})();