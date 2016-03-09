/**
 * Created by gopal on 3/3/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $http, $scope) {

        $scope.form = {};

        $http.defaults.headers.common.Authorization = 'X-Mashape-Key JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO';

        var lat = $routeParams.lat;
        var lon = $routeParams.lon;
        var trailname = $routeParams.trailname;
        var city = $routeParams.city;
        var url = "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&lon=" + lon +
            "&q[activities_activity_name_cont]=" + trailname + "q[city_cont]=" + city +
            "&q[activities_activity_type_name_eq]=hiking";

        var req = {
            method: 'GET',
            url: url,
            headers: {
                "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                "Accept": "text/plain"
            }
        };

        console.log(url);

        $http(req).then(function (result) {
            console.log(result);
            //var filter = result.data.places.city.indexOf(city);
            //console.log(filter);
            //$scope.place = result;

            var filter = {};

            for (var i = 0; i < result.data.places.length; i++) {
                if (result.data.places[i].lat == lat && result.data.places[i].lon == lon && result.data.places[i].name == trailname) {
                    filter = result.data.places[i];
                    break;
                }
            }
            $scope.place = filter;
            console.log(filter);
        }, function (result) {
            console.log('Error');
        });
    }
})();