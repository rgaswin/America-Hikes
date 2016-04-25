/**
 * Created by gopal on 3/3/2016.
 */
(function() {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $http, UserService, TrailService, $rootScope) {

        var currentUser = $rootScope.loggedInUser;

        var vm = this;
        vm.form = {};
        vm.showemptyheart = true;

        // Event Handler Declarations
        vm.getWeatherForFuture = getWeatherForFuture;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.updateComment = updateComment;
        vm.selectComment = selectComment;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;


        // Set Properties From RouteParams
        var currentTrail = $routeParams.trailId;
        var trailname = $routeParams.trailname;
        var lat = $routeParams.lat;
        var lon = $routeParams.lon;

        // Init Function to Initialize the page.
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
            // Show or Hide Heart For like
            ShowOrHideHeart();
        }

        // Initialization Functions for the page
        init();

        function GetDetailsFromTrailAPI() {
            var url = "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&lon=" + lon +
                "&q[activities_activity_name_cont]=" + trailname +
                "&q[activities_activity_type_name_eq]=hiking";

            TrailService.getDetailsFromTrailAPI(url).then(function(result) {
                var filter = {};
                for (var i = 0; i < result.data.places.length; i++) {
                    if (result.data.places[i].name == trailname) {
                        filter = result.data.places[i];
                        break;
                    }
                }
                vm.place = filter;
            }, function(err) {
                console.log(err);
            });
        }

        function FetchImagesFromBingAPI() {
            TrailService.fetchImagesFromBingAPI(trailname).then(
                function(response) {
                    vm.images = response.data.d.results;
                },
                function(error) {
                    console.log(error);
                }
            )
        }

        function GetAllTrailsForUser() {
            if (currentUser) {
                UserService.getAllUsersForTrail(currentTrail).then(
                    function(response) {
                       vm.userTrails = response.data;
                    }
                )
            }
        }

        function GetTodaysWeatherFromForecastAPI() {
            var currentdate = Math.floor(Date.now() / 1000);

            var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + "," + currentdate + "?callback=JSON_CALLBACK";

            TrailService.getWeatherFromForecastAPI(url).then(
                function(result) {
                    vm.weather = result;
                },
                function(result) {}
            );
        }

        function getWeatherForFuture() {
            var date = Date.parse(vm.startdate) / 1000;
            if (!isNaN(date)) {
                var url = "https://api.forecast.io/forecast/e9ca6bb302fd28ed3733bc20fab313fa/" + lat + "," + lon + "," +
                    date + "?callback=JSON_CALLBACK";

                vm.weather = {};

                TrailService.getWeatherFromForecastAPI(url).then(
                    function(result) {
                        vm.weather = result;
                    },
                    function(result) {

                    }
                );
            }
        }

        function RenderGoogleMaps() {
            vm.map = {
                center: {
                    latitude: lat,
                    longitude: lon
                },
                zoom: 8
            };
            vm.marker = {
                id: 0,
                location: {
                    latitude: lat,
                    longitude: lon
                }
            };
        }

        // Event Handler Implementations
        function favorite(place) {
            if (currentUser) {
                UserService.userLikesTrail(currentUser._id, place).then(
                    function(response) {
                        vm.showemptyheart = false;
                        GetAllTrailsForUser();
                    }
                );
            }
        }

        function unfavorite(place) {
            if (currentUser) {
                UserService.userLikesTrail(currentUser._id, place).then(
                    function(response) {
                        vm.showemptyheart = true;
                        GetAllTrailsForUser();
                    }
                );
            }
        }

        // Comments Related Functions
        // Get All Comments for the Trail
        function GetAllCommentsForTrail() {
            var trail = vm.place;
            if ($rootScope.loggedInUser !== null && typeof($rootScope.loggedInUser) !== "undefined") {
                TrailService.findAllCommentsForTrail(currentTrail)
                    .then(function(result) {
                        vm.comments = result.data;
                    });
            }
        }

        // Add a comment for the Trail
        function addComment() {
            var trail = vm.place;
            var userName = $rootScope.loggedInUser.username;
            var comment = {
                id: (new Date).getTime(),
                username: userName,
                comment: vm.comment,
                postedon: (new Date),
                trailId: trail.unique_id,
                city: trail.city,
                trailname: trail.name,
                lat: trail.lat,
                lon: trail.lon
            };
            TrailService.createCommentForTrail(trail.unique_id, comment).then(function(result) {
                    vm.comments = result.data;
                    vm.comment = "";
                },
                function(error) {
                    console.log(error);
                });
        }

        // Delete a comment for the Trail
        function deleteComment(index) {
            var comment = vm.comments[index];
            TrailService.deleteCommentForTrail(currentTrail, comment.id).then(function(result) {
                    vm.comments = result.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

        // Update a comment for the Trail
        function updateComment() {
            if (selectedCommentIndex >= 0) {
                var comment = vm.comments[selectedCommentIndex];
                TrailService.updateCommentForTrail(currentTrail, comment).then(function(result) {
                    vm.comments = result.data;
                    vm.comment = "";
                }, function(error) {
                    console.log(error);
                });
            }
        }

        // Select a comment for Edit
        var selectedCommentIndex = -1; // Contains the Index of currently selected record
        function selectComment(index) {
            selectedCommentIndex = index;
            vm.comment = vm.comments[selectedCommentIndex].comment;
        }

        function ShowOrHideHeart() {
            if ($rootScope.loggedInUser) {
                vm.showemptyheart = true;
                var usersLikedPlace = $rootScope.loggedInUser.likes;
                for (var user in usersLikedPlace) {
                    if (usersLikedPlace[user].id == currentTrail) {
                        vm.showemptyheart = false;
                        break;
                    }
                }
            }
        }

    }
})();