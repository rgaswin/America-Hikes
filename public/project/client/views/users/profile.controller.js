/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        // Set the View properties from the logged in user.
        $scope.aboutme = $rootScope.loggedInUser.aboutme;
        $scope.username = $rootScope.loggedInUser.username;
        $scope.email = $rootScope.loggedInUser.email;
        $scope.password = $rootScope.loggedInUser.password;
        //   $scope.dob = Date.parse($rootScope.loggedInUser.dob);
        $scope.firstname = $rootScope.loggedInUser.firstName;
        $scope.lastname = $rootScope.loggedInUser.lastName;
        $scope.trekimages = $rootScope.loggedInUser.images;
        if ($rootScope.loggedInUser.following == "") {
            $scope.following = [];
        }
        else {
            $scope.following = $rootScope.loggedInUser.following;
        }
        $scope.favoriteTreks = $rootScope.loggedInUser.likes;

        console.log($scope.favoriteTreks);

        // Event Handler Declarations
        $scope.update = update;
        $scope.uploadImage = uploadImage;
        // Event Handler Implementations
        function update() {
            $rootScope.loggedInUser.aboutme = $scope.aboutme;
            $rootScope.loggedInUser.username = $scope.username;
            $rootScope.loggedInUser.firstName = $scope.firstname;
            $rootScope.loggedInUser.lastName = $scope.lastname;
            $rootScope.loggedInUser.email = $scope.email;
            $rootScope.loggedInUser.password = $scope.password;
                        //     $rootScope.loggedInUser.dob = $scope.dob;
            UserService.updateUser($rootScope.loggedInUser._id, $rootScope.loggedInUser).then(function (ResponseUser) {
                $rootScope.loggedInUser = ResponseUser;
                $scope.message = "Profile updated Successfully"

            });
        }

        function uploadImage() {
            UserService.uploadImage();
        }

    }
})();