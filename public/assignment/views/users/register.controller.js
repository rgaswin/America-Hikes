/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var user = {
            "_id": (new Date).getTime(), "firstName": $scope.firstName, "lastName": $scope.lastName,
            "username": $scope.usrname, "password": $scope.password, "roles": ["student"]
        }

        $scope.register = register;

        function register() {
            UserService.createUser(user, function () {
                $rootScope.user = user;
                $location.url("/profile/");
            })
        }
    }
})();