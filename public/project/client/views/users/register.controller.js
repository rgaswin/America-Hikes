/**
 * Created by gopal on 2/15/2016.
 */
(function() {
    "use strict";
    angular
        .module("HikerApp")
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
            user.aboutme = $scope.aboutme;
            user.username = $scope.username;
            user.password = $scope.password;
            user.email = $scope.email;
            user.firstName = $scope.firstname;
            user.lastName = $scope.lastname;
            user.dob = $scope.dob;
            user.yearsOfTrekExperience = $scope.yrsOfTrekExp;

            UserService.register(user).then(function(response) {
                $rootScope.loggedInUser = response.data;
                $location.url("/profile");
            });
        }
    }
})();