/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        // Event Handler Declarations
        var model = this;
        model.login = login;

        // Event Handler Implementation
        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password).then(
                function (response) {
                    console.log(response);
                    if (response.data !== null && typeof(response.data) !== 'undefined') {
                        $rootScope.loggedInUser = response.data;
                        console.log( $rootScope.loggedInUser);
                        if ($rootScope.loggedInUser.roles !== null &&
                            typeof($rootScope.loggedInUser.roles) !== 'undefined' && $rootScope.loggedInUser.roles.indexOf('admin') >= 0) {
                            $location.url("/admin");
                        } else {
                            $location.url("/profile");
                        }
                    }
                    else {
                        model.message = "Invalid Credentials";
                        console.log(model.message);
                    }
                },
                function (response) {
                    console.log("error");
                }
            )
        }
    }
})();