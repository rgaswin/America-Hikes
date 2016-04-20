(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        // Event Handler Declarations
        var model = this;
        model.login = login;

        // Event Handler Implementation
        function login(user) {
            UserService
                .findUserByCredentials(user).then(
                function (response) {
                    console.log(response);
                    if (response.data !== null && typeof(response.data) !== 'undefined') {
                        UserService.setCurrentUser(response.data);
                        if ($rootScope.loggedInUser.roles !== null &&
                            typeof($rootScope.loggedInUser.roles) !== 'undefined' && $rootScope.loggedInUser.roles.indexOf('admin') >= 0) {
                            $location.url("/admin");
                        } else {
                            $location.url("/profile");
                        }
                    }
                    else {
                        model.message = "Invalid Credentials";
                    }
                },
                function (response) {
                    model.message = "Invalid Credentials";
                }
            )
        }
    }
})();