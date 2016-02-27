/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        // Set the View properties from the logged in user.
        $scope.username = $rootScope.loggedInUser.username;
        $scope.email = $rootScope.loggedInUser.email;
        $scope.password = $rootScope.loggedInUser.password;

        // Event Handler Declarations
        $scope.update = update;

        // Event Handler Implementations
        function update() {
            $rootScope.loggedInUser.username = $scope.username;
            $rootScope.loggedInUser.firstName = $scope.firstname;
            $rootScope.loggedInUser.lastName = $scope.lastname;
            $rootScope.loggedInUser.email = $scope.email;
            $rootScope.loggedInUser.password = $scope.password;
            UserService.updateUser($rootScope.loggedInUser._id, $rootScope.loggedInUser, function (ResponseUser) {
                $rootScope.loggedInUser = ResponseUser;
            });
        }
    }
})();