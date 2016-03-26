/**
 * Created by gopal on 3/1/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $http) {

   //     $http.defaults.headers.common.Authorization = 'X-Mashape-Key JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO';
        $scope.searchByInput = searchByInput;

        function searchByInput() {

            $scope.forms = [];

            var url = "https://trailapi-trailapi.p.mashape.com?&q[activities_activity_type_name_eq]=hiking&limit=25";

            if ($scope.city !== null && typeof($scope.city) !== "undefined")
                url = url + "&q[city_cont]=" + $scope.city;

            if ($scope.state !== null && typeof($scope.state) !== "undefined")
                url = url + "&q[state_cont]=" + $scope.state;

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                    "Accept": "text/plain"
                }
            };

            $http(req).then(function (result) {
                $scope.places = result;
                console.log(result);
            }, function (result) {
                console.log("Error : " + result);
            });
        }
    }
})();