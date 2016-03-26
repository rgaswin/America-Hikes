/**
 * Created by gopal on 3/3/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, $http, UserService, UserDataService, $rootScope) {

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
            UserDataService.findAllCommentsForUser($rootScope.loggedInUser._id, function (result) {
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
            UserDataService.createCommentForUser($rootScope.loggedInUser._id, vm.comment, $rootScope.loggedInUser.username, function (result) {
                console.log(result);
                vm.comments.push(result);
                vm.comment = "";
            });
        };

        function deletecomment(index) {
            var commentId = vm.comments[index]._id;
            UserDataService.deleteCommentById(commentId, function (result) {
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
                UserDataService.updateCommentById(commentId, newComment, function (response) {
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