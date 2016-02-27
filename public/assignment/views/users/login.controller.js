/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        // Event Handler Declarations
        $scope.login = login;

        // Event Handler Implementation
        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function (response) {
                if (response !== null) {
                    $rootScope.loggedInUser = response;
                    $location.url("/profile");
                }
                else
                $scope.message = "Invalid Credentials";

            });
        }
    }
})();