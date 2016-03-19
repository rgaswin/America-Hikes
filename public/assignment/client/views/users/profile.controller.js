/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        // Set the View properties from the logged in user.
        vm.username = $rootScope.loggedInUser.username;
        vm.email = $rootScope.loggedInUser.email;
        vm.password = $rootScope.loggedInUser.password;
        vm.firstname = $rootScope.loggedInUser.firstName;
        vm.lastname = $rootScope.loggedInUser.lastName;
        // Event Handler Declarations
        vm.update = update;

        // Event Handler Implementations
        function update() {
            $rootScope.loggedInUser.username = vm.username;
            $rootScope.loggedInUser.firstName = vm.firstname;
            $rootScope.loggedInUser.lastName = vm.lastname;
            $rootScope.loggedInUser.email = vm.email;
            $rootScope.loggedInUser.password = vm.password;
            UserService.updateUser($rootScope.loggedInUser._id, $rootScope.loggedInUser).then(
                function (ResponseUser) {
                    $rootScope.loggedInUser = ResponseUser.data;
                    console.log($rootScope.loggedInUser);
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    }
})();