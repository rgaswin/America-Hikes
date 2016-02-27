(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login() {
            var username = $scope.username;
            var password = $scope.password;
            UserService.findUserByUsernameAndPassword(username, password, function (response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });

        }
    }
})();