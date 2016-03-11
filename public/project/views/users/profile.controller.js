/**
 * Created by gopal on 2/15/2016.
 */
(function() {
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
        $scope.dob =  $rootScope.loggedInUser.dob;
        $scope.firstname = $rootScope.loggedInUser.firstName;
        $scope.lastname = $rootScope.loggedInUser.lastName;

        // Adding Test data at the moment
        $scope.favoriteTreks = ["Trek1", "Trek2","Trek3"];
        $scope.treksReviewed = ["Trek1", "Trek2","Trek3"];
        $scope.trekimages = ["Image1","Image2","Image3","Image4"];

      //  console.log($scope.favoriteTreks);

        // Event Handler Declarations
        $scope.update = update;

        // Event Handler Implementations
        function update() {
            $rootScope.loggedInUser.aboutme = $scope.aboutme;
            $rootScope.loggedInUser.username = $scope.username;
            $rootScope.loggedInUser.firstName = $scope.firstname;
            $rootScope.loggedInUser.lastName = $scope.lastname;
            $rootScope.loggedInUser.email = $scope.email;
            $rootScope.loggedInUser.password = $scope.password;
            $rootScope.loggedInUser.dob = $scope.dob ;
            UserService.updateUser($rootScope.loggedInUser._id, $rootScope.loggedInUser, function(ResponseUser) {
                $rootScope.loggedInUser = ResponseUser;
            });
        }
    }
})();