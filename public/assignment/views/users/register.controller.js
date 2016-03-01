/**
 * Created by gopal on 2/15/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        var user = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "username": $scope.username,
            "email": $scope.email,
            "password": $scope.password,
            "roles": ["student"]
        };

        // Event Handler Declarations
        $scope.register = register;

        // Event Handler Implementations
        function register() {
            user.username = $scope.username;
            user.password = $scope.password;
            user.email = $scope.email;
            UserService.createUser(user, function(response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }
    }
})();