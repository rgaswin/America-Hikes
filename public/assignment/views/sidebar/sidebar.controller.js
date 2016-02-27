/**
 * Created by gopal on 2/19/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope,$location){
        $scope.$location = $location;
    }
})();