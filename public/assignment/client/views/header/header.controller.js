/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, UserService, $location) {
        $scope.Logout = Logout;

        function Logout() {
            UserService.logoutUser().then(
                function (success) {
                    $rootScope.loggedInUser = null;
                    $location.url("/home");
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    }
})();