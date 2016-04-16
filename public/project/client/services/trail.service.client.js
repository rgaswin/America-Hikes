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
            createCommentForUser: createCommentForUser,
            findAllCommentsForTrail: findAllCommentsForTrail,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };

        return api;

        function createCommentForUser(trailId, comment) {
            var url = "/api/project/trail/" + trailId + "/comment";
            return $http.post(url, comment);
        }

        function findAllCommentsForTrail(trailId) {
            var url = "/api/project/trail/" + trailId + "/comment";
            return $http.get(url);
        }

        function deleteCommentById(commentId, callback) {
            for (var i = 0; i < comments.length; i++) {
                if (comments[i]._id === commentId) {
                    comments.splice(i, 1);
                    break;
                }
            }
            callback(comments);
        }

        function updateCommentById(commentId, newComment, callback) {
            for (var i = 0; i < comments.length; i++) {
                if (comments[i]._id === commentId) {
                    comments[i]._id = newComment._id;
                    comments[i].comment = newComment.comment;
                    comments[i].userId = newComment.userId;
                    comments[i].username = newComment.username;
                    callback(comments[i]);
                    break;
                }
            }
        }
    }
})();