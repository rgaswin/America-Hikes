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
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function (response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }
    }
})();