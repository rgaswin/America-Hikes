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
    }
})();