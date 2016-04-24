/**
 * Created by gopal on 3/1/2016.
 */
(function() {
    angular
        .module("HikerApp")
        .controller("HomeController", HomeController);

    // NOTE: Using $scope in this page alone as watch function is not supported by vm.
    //       $watch must be attached to $scope
    function HomeController($scope, $rootScope, TrailService, $http, $sce) {
        function init() {
            if ($rootScope.homeURL)
                getTrailInformation($rootScope.homeURL);
        }

        init();

        function setPaginationProperties() {
            $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;

            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                if ($scope.places)
                    $scope.filteredplaces = $scope.places.slice(begin, end);
            });
        };

        setPaginationProperties();
        $scope.searchByInput = searchByInput;

        function searchByInput() {
            var url = "https://trailapi-trailapi.p.mashape.com?&q[activities_activity_type_name_eq]=hiking&limit=50";

            if ($scope.state) {
                url = url + "&q[state_cont]=" + $scope.state;
            }

            // To persist search results after hitting the back button
            $rootScope.homeURL = url;

            // Get All Trails from Trail API
            getTrailInformation(url);

        }

        function getTrailInformation(url) {
            TrailService.getDetailsFromTrailAPI(url).then(
                function(result) {
                    for (var placeindex in result.data.places) {
                        result.data.places[placeindex].activities[0].description = $sce.trustAsHtml(result.data.places[placeindex].activities[0].description);
                    }
                    $scope.places = result.data.places;
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                        end = begin + $scope.numPerPage;
                    if ($scope.places)
                        $scope.filteredplaces = $scope.places.slice(begin, end);

                },
                function(result) {
                    console.log("Error : " + result);
                });
        }
    }
})();