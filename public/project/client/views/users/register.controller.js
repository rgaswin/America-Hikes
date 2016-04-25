/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var vm = this;

        var user = {
            "firstName": vm.firstName,
            "lastName": vm.lastName,
            "username": vm.username,
            "email": vm.email,
            "password": vm.password,
            "roles": ["student"]
        };

        // Event Handler Declarations
        vm.register = register;

        // Event Handler Implementations
        function register() {
            user.aboutme = vm.aboutme;
            user.username = vm.username;
            user.password = vm.password;
            user.email = vm.email;
            user.firstName = vm.firstname;
            user.lastName = vm.lastname;
            user.dob = vm.dob;
            user.yrsOfTrekExp = vm.yrsOfTrekExp;

            if (vm.username && vm.password && vm.email && vm.firstname && vm.lastname ) {
                UserService.register(user).then(function (response) {
                    $rootScope.loggedInUser = response.data;
                    $location.url("/profile");
                });
            }

            else {
                vm.message = "Please fill all required fields";
            }
        }
    }
})();