/**
 * Created by gopal on 3/1/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $http, $sce) {
        function init() {
            if ($rootScope.setSearchFlag)
                searchByInput();
        }

        init();

        function setPaginationProperties() {
            $scope.currentPage = 1
                , $scope.numPerPage = 10
                , $scope.maxSize = 5;

            $scope.$watch('currentPage + numPerPage', function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;
                if ($scope.places)
                    $scope.filteredplaces = $scope.places.slice(begin, end);
            });
        };

        setPaginationProperties();
        $scope.searchByInput = searchByInput;

        function searchByInput() {
            var url = "https://trailapi-trailapi.p.mashape.com?&q[activities_activity_type_name_eq]=hiking&limit=25";
            if ($rootScope.default) {
                if ($rootScope.default == "") {
                    $rootScope.setSearchFlag == $rootScope.state;
                    url = url + "&q[state_cont]=" + $rootScope.setSearchFlag;
                }
            }

            if ($rootScope.state){
                if($rootScope.state != ""){
                    $rootScope.setSearchFlag == $rootScope.state;
                    url = url + "&q[state_cont]=" + $rootScope.setSearchFlag;
                }
            }


            if ($scope.state !== null && typeof($scope.state) !== "undefined") {
                url = url + "&q[state_cont]=" + $scope.state;
                $rootScope.setSearchFlag = $scope.state;
                $rootScope.state = $scope.state;
                $rootScope.default = "";
            }

            else {
                $rootScope.state = "";
                $rootScope.default = "default";
                $rootScope.setSearchFlag = "default";
            }

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                    "Accept": "text/plain"
                }
            };

            $http(req).then(function (result) {

                for (var placeindex in result.data.places) {
                    result.data.places[placeindex].activities[0].description = $sce.trustAsHtml(result.data.places[placeindex].activities[0].description);
                    console.log(result.data.places[placeindex].activities[0].description);
                }

                console.log(result);
                $scope.places = result.data.places;
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;
                if ($scope.places)
                    $scope.filteredplaces = $scope.places.slice(begin, end);

            }, function (result) {
                console.log("Error : " + result);
            });
        }
    }
})();