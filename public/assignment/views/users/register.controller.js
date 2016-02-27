/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        var user = {
            "_id": (new Date).getTime(), "firstName": $scope.firstName, "lastName": $scope.lastName,
            "username": $scope.username, "password": $scope.password, "roles": ["student"]
        };

        // Event Handler Declarations
        $scope.register = register;

        // Event Handler Implementations
        function register() {
            user.username = $scope.username;
            UserService.createUser(user, function (response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }
    }
})();