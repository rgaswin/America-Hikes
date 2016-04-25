/**
 * Created by gopal on 3/11/2016.
 */
(function () {

    angular
        .module('HikerApp')
        .controller("ViewUserController", ViewUserController);


    function ViewUserController($routeParams, $rootScope, UserService) {
        var vm = this;
        vm.followUser = followUser;
        var OtherUser = 0;
        var OtherUserName = $routeParams.userName;

        UserService.findUserByUsername(OtherUserName).then(
            function (response) {
                var user = response.data;
                // Set the View properties
                OtherUser = user._id;
                vm.aboutme = user.aboutme;
                vm.username = user.username;
                vm.email = user.email;
                vm.firstname = user.firstName;
                vm.lastname = user.lastName;
                vm.trekimages = user.images;
                vm.following = user.following;
                vm.favoriteTreks = user.likes;

                for (var user in $rootScope.loggedInUser.following) {
                    if (vm.username == $rootScope.loggedInUser.following[user]) {
                        vm.isfollowing = true;
                        break;
                    }
                }

            });

        function followUser() {
            UserService.followUser(OtherUserName, $rootScope.loggedInUser._id).then(
                function (success) {
                    if (vm.isfollowing) {
                        vm.message = "You are no longer following  " + OtherUserName;
                        vm.isfollowing = false;
                    }
                    else {
                        vm.message = "You are now following " + OtherUserName;
                        vm.isfollowing = true;
                    }
                },
                function (error) {
                }
            )
        }
    }
})();