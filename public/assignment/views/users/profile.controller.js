(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.update = update;

        function update() {
            var user = $rootScope.user;
            user.firstName = $scope.firstname;
            user.lastName = $scope.lastname;
            user.email = $scope.email;
            user.password = $scope.password;
            UserService.updateUser(user._id, user, function (ResponseUser) {
                console.log(ResponseUser);
            });
        }
    }
})();