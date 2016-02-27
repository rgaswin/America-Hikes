/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        console.log($scope.username);

        var user = {
            "_id": (new Date).getTime(), "firstName": $scope.firstName, "lastName": $scope.lastName,
            "username": $scope.username, "password": $scope.password, "roles": ["student"]
        };

        $scope.register = register;

        function register() {
            user.username = $scope.username;
            UserService.createUser(user, function (response) {
                $rootScope.loggedInUser = response;
                $location.url("/profile");
            });
        }
    }
})();