/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        // Event Handler Declarations
        vm.register = register;

        // Event Handler Implementations
        function register(user) {
            var usr = {
              username : user.username,
              password : user.password,
              email : user.email
            };
            UserService.createUser(usr).then(function (response) {
                    $rootScope.loggedInUser = usr;
                    $location.url("/profile");
                },
                function (error) {
                    console.log(error);
                });
        }
    }
})();