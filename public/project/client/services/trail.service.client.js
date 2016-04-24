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
            getWeatherFromForecastAPI:getWeatherFromForecastAPI,
            createCommentForTrail: createCommentForTrail,
            findAllCommentsForTrail: findAllCommentsForTrail,
            deleteCommentForTrail: deleteCommentForTrail,
            updateCommentForTrail: updateCommentForTrail
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
                url: "https://api.datamarket.azure.com/Bing/Search/Image?Query=%27" + trailname + "%27&$format=json&$top=5",
                headers: {
                    'Authorization': 'Basic OmdPWEc4SVpxb3ZCWkdad3RTRE5qL3Z0ZlIvL3BYNGVuUTNlSVI1dTIxQnM='
                },
            };

            return $http(bingReq);
        }

        function getWeatherFromForecastAPI(url){
            return $http.jsonp(url)
        }
    }
})();