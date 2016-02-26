(function () {
        angular
            .module("FormBuilderApp")
            .controller("LoginController", LoginController);

        function LoginController($scope, $location, $rootScope, UserService) {
            $scope.login = login;

            function login() {
                var username = $scope.username;
                var password = $scope.password;
                var loggedUser = UserService.findUserByUsernameAndPassword(username, password, function (response) {
                    $rootScope.data = response;
                    console.log(response);
                });

                $rootScope.loggedInUser = loggedUser;
                $location.url("/profile");
            }
        }
    })();