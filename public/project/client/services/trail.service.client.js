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
                url: "https://https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + trailname ,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Ocp-Apim-Subscription-Key': '06d39796-21bd-460a-ba56-49d333cf8b0e'
                },
            };

            // var bingReq = {
            //     method: 'POST',
            //     url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + trailname,
            //     headers: {
            //         'Ocp-Apim-Subscription-Key': 'ca824ab482484cb2991f4dc9ae4a2940'
            //     },
            // };

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