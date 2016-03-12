/**
 * Created by gopal on 3/3/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $http, $scope, UserDataService, $rootScope) {

        $scope.form = {};
        $scope.getweather = getweather;
        $scope.addcomment = addcomment;
        $scope.deletecomment = deletecomment;
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

        }, function (result) {

        });

        //var Flickr = requirejs("flickrapi"),
        //    flickrOptions = {
        //        api_key: "8344999c551c14b4b3f671f8df25abd8",
        //        secret: "2e124629293b8ce3"
        //    };
        //
        //Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        //    // we can now use "flickr" as our API object,
        //    // but we can only call public methods and access public data
        //    console.log(flickr);
        //
        //});

        //var req = {
        //    method: 'GET',
        //    url: "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/37.8267,-122.423?callback=JSON_CALLBACK"
        //};

        var currentdate = Date.parse(new Date().getDate()) / 1000;


        console.log(currentdate);

        var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + "," + currentdate + "?callback=JSON_CALLBACK";

        $http.jsonp(url).then(
            function (result) {
                console.log(result);
                $scope.weather = result;
            }, function (result) {

            }
        );

        function getweather() {

            console.log(Date.parse(new Date().getDate()))

            var date = Date.parse($scope.startdate) / 1000;

            var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + ","
                + date + "?callback=JSON_CALLBACK";


            console.log(date);

            $scope.weather = {};

            $http.jsonp(url).then(
                function (result) {
                    console.log(result);
                    $scope.weather = result;
                }, function (result) {

                }
            );
        }

        console.log($scope.loggedInUser !== null && typeof($scope.loggedInUser) !== "undefined");

        if ($scope.loggedInUser !== null && typeof($scope.loggedInUser) !== "undefined") {
            UserDataService.findAllCommentsForUser($rootScope.loggedInUser._id, function (result) {
                $scope.comments = result;
                console.log(result);
            });

            console.log($scope.loggedInUser);

        }

        function addcomment() {
            console.log($rootScope.loggedInUser._id);
            console.log($scope.comment);

            UserDataService.createCommentForUser($rootScope.loggedInUser._id, $scope.comment, $rootScope.loggedInUser.username, function (result) {
                console.log(result);
                $scope.comments.push(result);
                $scope.comment = "";
            });
        };

        function deletecomment(index) {
            var commentId = $scope.comments[index]._id;
            UserDataService.deleteCommentById(commentId,function(result){
                $scope.comments.splice(index, 1);
            });
        }

    }
})();