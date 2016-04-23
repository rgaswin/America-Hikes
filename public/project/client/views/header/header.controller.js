/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        var vm = this;
        // Event Handker Declaration
        vm.Logout = Logout;

        // Event Handler Implementation
        function Logout() {
            UserService.logoutUser().then(function (response) {
                $rootScope.loggedInUser = null;
                $location.url("/home");
            });
        }
    }
})();