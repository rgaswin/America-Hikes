(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.update = update;

        function update() {
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