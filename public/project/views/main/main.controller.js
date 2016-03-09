/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.location = $location;
    }
})();