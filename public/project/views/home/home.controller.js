/**
 * Created by gopal on 3/1/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $http) {

        $http.defaults.headers.common.Authorization = 'X-Mashape-Key JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO';
        $scope.searchByInput = searchByInput;

        function searchByInput() {

            $scope.forms = [];

      //      var url = "https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&limit=25";

            var id = 5058;

            var url = "https://trailapi-trailapi.p.mashape.com?unique_id=" + id +
                "&q[activities_activity_type_name_eq]=hiking";

        //    var url = "https://trailapi-trailapi.p.mashape.com?unique_id=5058&q[activities_activity_type_name_eq]=hiking"

            if ($scope.latitude !== null && typeof($scope.latitude) !== "undefined")
                url = url + "&lat=" + $scope.latitude;

            if ($scope.longtitude !== null && typeof($scope.longtitude) !== "undefined")
                url = url + "&lon=" + $scope.longtitude;

            if ($scope.description !== null && typeof($scope.description) !== "undefined")
                url = url + "&q[activities_activity_name_cont]=" + $scope.description;

            if ($scope.city !== null && typeof($scope.city) !== "undefined")
                url = url + "&q[city_cont]=" + $scope.city;


            var req = {
                method: 'GET',
                url: url,
                headers: {
                    "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                    "Accept": "text/plain"
                }
            };

            $http(req).then(function (result) {
                console.log(result);
                $scope.places = result;

            }, function (result) {
                console.log("Error")
                console.log(result)
            });
        }
    }
})();