/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $window, UserService) {
        var vm = this;
        // Initialization function
        function init() {
            // Set the View properties from the logged in user.
            vm.aboutme = $rootScope.loggedInUser.aboutme;
            vm.username = $rootScope.loggedInUser.username;
            vm.email = $rootScope.loggedInUser.email;
            vm.password = $rootScope.loggedInUser.password;
            vm.firstname = $rootScope.loggedInUser.firstName;
            vm.lastname = $rootScope.loggedInUser.lastName;
            vm.trekimages = $rootScope.loggedInUser.images;
            if ($rootScope.loggedInUser.following == "") {
                vm.following = [];
            }
            else {
                vm.following = $rootScope.loggedInUser.following;
            }
            vm.favoriteTreks = $rootScope.loggedInUser.likes;
        }

        // Calling the init function
        init();

        // Event Handler Declarations
        vm.update = update;
        vm.uploadImage = uploadImage;
        // Event Handler Implementations
        function update() {
            $rootScope.loggedInUser.aboutme = vm.aboutme;
            $rootScope.loggedInUser.username = vm.username;
            $rootScope.loggedInUser.firstName = vm.firstname;
            $rootScope.loggedInUser.lastName = vm.lastname;
            $rootScope.loggedInUser.email = vm.email;
            $rootScope.loggedInUser.password = vm.password;
            UserService.updateUser($rootScope.loggedInUser._id, $rootScope.loggedInUser).then(function (ResponseUser) {
                $rootScope.loggedInUser = ResponseUser.data;
                vm.message = "Profile updated Successfully";
                $window.scrollTo(0, 0);
                console.log( $rootScope.loggedInUser);
            });
        }

        function uploadImage() {
            UserService.uploadImage();
        }
    }
})();