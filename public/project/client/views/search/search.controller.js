/**
 * Created by gopal on 3/3/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, $http, UserService, TrailService, $rootScope) {

        var currentUser = $rootScope.loggedInUser;
        var vm = this;
        vm.form = {};
        vm.getWeatherForFuture = getWeatherForFuture;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.updateComment = updateComment;
        vm.selectComment = selectComment;
        vm.favorite = favorite;
        $http.defaults.headers.common.Authorization = 'X-Mashape-Key JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO';

        var currentTrail = $routeParams.trailId;
        var trailname = $routeParams.trailname;
        var lat = $routeParams.lat;
        var lon = $routeParams.lon;

        function init() {
            // Fetch the Trail Details
            GetDetailsFromTrailAPI();
            // Get Images of the Trail From Bing API
            FetchImagesFromBingAPI();
            // Get All Users for Trail
            GetAllTrailsForUser();
            // Get Today's Weather From Forecast API
            GetTodaysWeatherFromForecastAPI();
            // Render Google Maps for the Location
            RenderGoogleMaps();
            // Get All Comments for the Trail
            GetAllCommentsForTrail();
        }

        // Initialization Functions for the page
        init();

        function GetDetailsFromTrailAPI() {
            var url = "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&lon=" + lon +
                "&q[activities_activity_name_cont]=" + trailname +
                "&q[activities_activity_type_name_eq]=hiking";

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                    //"X-Mashape-Key": process.env.TrailAPIKey,
                    "Accept": "text/plain"
                }
            };

            $http(req).then(function (result) {
                var filter = {};
                for (var i = 0; i < result.data.places.length; i++) {
                    if (result.data.places[i].name == trailname) {
                        filter = result.data.places[i];
                        lat = result.data.places[i].lat;
                        lon = result.data.places[i].lon;
                        city = result.data.places[i].city;
                        break;
                    }
                }
                vm.place = filter;
                currentTrail = filter.unique_id;
            }, function (err) {
                console.log(err);
            });
        }

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

        function GetTodaysWeatherFromForecastAPI() {
            var currentdate = Math.floor(Date.now() / 1000);
            console.log(currentdate);

            var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + "," + currentdate + "?callback=JSON_CALLBACK";

            $http.jsonp(url).then(
                function (result) {
                    vm.weather = result;
                }, function (result) {
                }
            );
        }

        function getWeatherForFuture() {
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

        function RenderGoogleMaps() {
            $scope.map = {center: {latitude: lat, longitude: lon}, zoom: 8};
            $scope.marker = {
                id: 0,
                location: {
                    latitude: lat,
                    longitude: lon
                }
            };
        }

        function GetAllCommentsForTrail() {
            var trail = vm.place;
            if ($rootScope.loggedInUser !== null && typeof($rootScope.loggedInUser) !== "undefined") {
                TrailService.findAllCommentsForTrail(currentTrail)
                    .then(function (result) {
                        console.log("Comments - ");
                        console.log(result);
                        vm.comments = result.data;
                    });
            }
        }

        // Event Handler Implementations
        function favorite(place) {
            if (currentUser) {
                UserService.userLikesTrail(currentUser._id, place).then(
                    function (response) {
                        GetAllTrailsForUser();
                    }
                );
            }
        }

        function addComment() {
            var trail = vm.place;
            var userName = $rootScope.loggedInUser.username;
            var comment = {
                _id: (new Date).getTime(),
                username: userName,
                comment: vm.comment,
                postedon: (new Date)
            };
            TrailService.createCommentForUser(trail.unique_id, comment).then(function (result) {
                    vm.comments = result.data;
                },
                function (error) {
                    console.log(error);
                });
        }

        function deleteComment(index) {
            var commentId = vm.comments[index]._id;
            TrailService.deleteCommentById(commentId, function (result) {
                vm.comments.splice(index, 1);
            });
        }

        function updateComment() {
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
        function selectComment(index) {
            console.log('select');
            selectedCommentIndex = index;
            vm.comment = vm.comments[selectedCommentIndex].comment;
        }
    }
})();