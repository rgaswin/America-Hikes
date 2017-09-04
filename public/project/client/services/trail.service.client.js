/**
 * Created by gopal on 2/18/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .factory("TrailService", TrailService);

    function TrailService($http) {
        var comments = [];

        var api = {
            getDetailsFromTrailAPI: getDetailsFromTrailAPI,
            fetchImagesFromBingAPI: fetchImagesFromBingAPI,
            getWeatherFromForecastAPI: getWeatherFromForecastAPI,
            createCommentForTrail: createCommentForTrail,
            findAllCommentsForTrail: findAllCommentsForTrail,
            deleteCommentForTrail: deleteCommentForTrail,
            updateCommentForTrail: updateCommentForTrail,
            getAllStates:getAllStates
        };

        return api;

        function createCommentForTrail(trailId, comment) {
            var url = "/api/project/trail/" + trailId + "/comment";
            return $http.post(url, comment);
        }

        function findAllCommentsForTrail(trailId) {
            var url = "/api/project/trail/" + trailId + "/comment";
            return $http.get(url);
        }

        function deleteCommentForTrail(trailId, commentId) {
            var url = "/api/project/trail/" + trailId + "/comment/" + commentId;
            return $http.delete(url);
        }

        function updateCommentForTrail(trailId, comment) {
            var url = "/api/project/trail/" + trailId + "/comment";
            return $http.put(url, comment);
        }

        function getDetailsFromTrailAPI(url) {
            var req = {
                method: 'GET',
                url: url,
                headers: {
                    "X-Mashape-Key": "JpqqeDQjdxmshlSW6xeSFJUKWuFfp1nz7QTjsnuWxTaf8awgDO",
                    "Accept": "text/plain"
                }
            };

            return $http(req);
        }

        function fetchImagesFromBingAPI(trailname) {

            var bingReq = {
                method: 'POST',
                url: "https://user:3PKBCTHpy6B7Jzfvoxi7qUPudr6aUleC+EtsZ0BKjFE=@api.datamarket.azure.com/Bing/Search/Image?Query=%27" + trailname + "%27&$format=json&$top=5",
                headers: {
                    'Authorization': 'Basic 3PKBCTHpy6B7Jzfvoxi7qUPudr6aUleC+EtsZ0BKjFE='
                },
            };

            return $http(bingReq);
        }

        function getWeatherFromForecastAPI(url) {
            return $http.jsonp(url)
        }

        function getAllStates() {
            return [
                "Alabama"
                , "Alaska"
                , "American Samoa"
                , "Arizona"
                , "Arkansas"
                , "California"
                , "Colorado"
                , "Connecticut"
                , "Delaware"
                , "District of Columbia"
                , "Florida"
                , "Georgia"
                , "Hawaii"
                , "Idaho"
                , "Illinois"
                , "Indiana"
                , "Iowa"
                , "Kansas"
                , "Kentucky"
                , "Louisiana"
                , "Maine"
                , "Maryland"
                , "Massachusetts"
                , "Michigan"
                , "Minnesota"
                , "Mississippi"
                , "Missouri"
                , "Montana"
                , "Nebraska"
                , "Nevada"
                , "New Hampshire"
                , "New Jersey"
                , "New Mexico"
                , "New York"
                , "North Carolina"
                , "North Dakota"
                , "Northern Marianas Islands"
                , "Ohio"
                , "Oklahoma"
                , "Oregon"
                , "Pennsylvania"
                , "Puerto Rico"
                , "Rhode Island"
                , "South Carolina"
                , "South Dakota"
                , "Tennessee"
                , "Texas"
                , "Utah"
                , "Vermont"
                , "Virginia"
                , "Virgin Islands"
                , "Washington"
                , "West Virginia"
                , "Wisconsin"
                , "Wyoming"
            ];
        }

    }
})();