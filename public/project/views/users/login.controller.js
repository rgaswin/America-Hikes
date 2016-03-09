/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        // Event Handler Declarations
        $scope.login = login;

        // Event Handler Implementation
        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function (response) {
                if (response !== null && typeof(response) !== 'undefined') {
                    $rootScope.loggedInUser = response;
                    if ($rootScope.loggedInUser.roles.indexOf('admin') >= 0) {
                        $location.url("/admin");
                    } else {
                        $location.url("/profile");
                    }
                } else {
                    $scope.message = "Invalid Credentials";
                }
            });
        }
    }
})();