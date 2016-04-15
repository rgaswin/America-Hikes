/**
 * Created by gopal on 3/3/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, $http, UserService, TrailService, $rootScope) {

        var currentUser = $rootScope.loggedInUser;
        var currentTrail = 0;
        var vm = this;
        vm.form = {};
        vm.getweather = getweather;
        vm.addcomment = addcomment;
        vm.deletecomment = deletecomment;
        vm.updatecomment = updatecomment;
        vm.selectcomment = selectcomment;
        vm.favorite = favorite;
        $http.defaults.headers.common.Authorization = 'X-Mashape-Key JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO';

        var lat = $routeParams.lat;
        var lon = $routeParams.lon;
        var trailname = $routeParams.trailname;
        var city = $routeParams.city;

        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};
        $scope.marker = {
            id: 0,
            location: {
                latitude: 45,
                longitude: -73
            }
        };

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
            var filter = {};

            for (var i = 0; i < result.data.places.length; i++) {
                if (result.data.places[i].lat == lat && result.data.places[i].lon == lon && result.data.places[i].name == trailname) {
                    filter = result.data.places[i];
                    break;
                }
            }
            vm.place = filter;
            currentTrail = filter.unique_id;

            // Get All Users for Trail
            GetAllTrailsForUser();

        }, function (result) {

        });

        function GetAllTrailsForUser() {
            if (currentUser) {
                UserService.getAllUsersForTrail(currentTrail).then(
                    function (response) {
                        if (response.data == "")
                            vm.userTrails = ["None"];
                        else
                            vm.userTrails = response.data;

                    }
                )
            }
        }

        var currentdate = Date.parse(new Date().getDate()) / 1000;

        var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + "," + currentdate + "?callback=JSON_CALLBACK";

        $http.jsonp(url).then(
            function (result) {
                vm.weather = result;
            }, function (result) {
            }
        );

        function FetchImagesFromBingAPI() {
            var bingReq = {
                method: 'POST',
                url: "https://api.datamarket.azure.com/Bing/Search/Image?Query=%27" + trailname + "%27&$format=json&$top=5",
                headers: {
                    'Authorization': 'Basic OmdPWEc4SVpxb3ZCWkdad3RTRE5qL3Z0ZlIvL3BYNGVuUTNlSVI1dTIxQnM='
                },
            };

            $http(bingReq).then(
                function (response) {
                    vm.images = response.data.d.results;
                },
                function (error) {
                    console.log(error);
                }
            )
        }

        FetchImagesFromBingAPI();


        function getweather() {

            console.log(Date.parse(new Date().getDate()));

            var date = Date.parse(vm.startdate) / 1000;
            if (!isNaN(date)) {
                var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + ","
                    + date + "?callback=JSON_CALLBACK";

                vm.weather = {};

                $http.jsonp(url).then(
                    function (result) {
                        console.log(result);
                        vm.weather = result;
                    }, function (result) {

                    }
                );
            }
        }

        if ($rootScope.loggedInUser !== null && typeof($rootScope.loggedInUser) !== "undefined") {
            TrailService.findAllCommentsForUser($rootScope.loggedInUser._id, function (result) {
                vm.comments = result;
                console.log(result);
            });
        }

        function favorite(place) {
            if (currentUser) {
                UserService.userLikesTrail(currentUser._id, place).then(
                    function (response) {
                        GetAllTrailsForUser();
                    }
                );
            }
        }

        function addcomment() {
            var trailId = vm.place;
            var userName = $rootScope.loggedInUser.username;
            var comment = {
                _id: (new Date).getTime(),
                username: userName,
                comment: vm.comment,
                postedon: (new Date)
            };
            TrailService.createCommentForUser(currentTrail, comment).then(function (result) {
                    console.log(result);
                    vm.comments.push(result);
                    vm.comment = "";
                },
                function (error) {
                    console.log(error);
                });
        };

        function deletecomment(index) {
            var commentId = vm.comments[index]._id;
            TrailService.deleteCommentById(commentId, function (result) {
                vm.comments.splice(index, 1);
            });
        }

        function updatecomment() {
            if (selectedCommentIndex >= 0) {
                var userId = vm.comments[selectedCommentIndex].userId;
                var commentId = vm.comments[selectedCommentIndex]._id;
                var newComment = {
                    _id: commentId,
                    comment: vm.comment,
                    userId: userId,
                    username: $rootScope.loggedInUser.username
                };
                TrailService.updateCommentById(commentId, newComment, function (response) {
                });
            }
        }

        var selectedCommentIndex = -1; // Contains the Index of currently selected record
        function selectcomment(index) {
            console.log('select');
            selectedCommentIndex = index;
            vm.comment = vm.comments[selectedCommentIndex].comment;
        }
    }
})();