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
        $scope.updatecomment = updatecomment;
        $scope.selectcomment = selectcomment;
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

        var currentdate = Date.parse(new Date().getDate()) / 1000;

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

        if ($scope.loggedInUser !== null && typeof($scope.loggedInUser) !== "undefined") {
            UserDataService.findAllCommentsForUser($rootScope.loggedInUser._id, function (result) {
                $scope.comments = result;
                console.log(result);
            });
        }

        function addcomment() {
            UserDataService.createCommentForUser($rootScope.loggedInUser._id, $scope.comment, $rootScope.loggedInUser.username, function (result) {
                console.log(result);
                $scope.comments.push(result);
                $scope.comment = "";
            });
        };

        function deletecomment(index) {
            var commentId = $scope.comments[index]._id;
            UserDataService.deleteCommentById(commentId, function (result) {
                $scope.comments.splice(index, 1);
            });
        }

        function updatecomment() {
            if (selectedCommentIndex >= 0) {
                var userId = $scope.comments[selectedCommentIndex].userId;
                var commentId = $scope.comments[selectedCommentIndex]._id;
                var newComment = {
                    _id: commentId,
                    comment: $scope.comment,
                    userId: userId,
                    username: $rootScope.loggedInUser.username
                };
                UserDataService.updateCommentById(commentId, newComment, function (response) {
                });
            }
        }

        var selectedCommentIndex = -1; // Contains the Index of currently selected record

        function selectcomment(index) {
            console.log('select');
            selectedCommentIndex = index;
            $scope.comment = $scope.comments[selectedCommentIndex].comment;
        }


    }
})();