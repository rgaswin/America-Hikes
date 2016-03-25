/**
 * Created by gopal on 2/18/2016.
 */
(function () {
    "use strict";
    angular
        .module("HikerApp")
        .factory("UserDataService", UserDataService);

    function UserDataService() {
        var comments = [];
        comments = [{
            "_id": "000",
            "comment": "This is a comment",
            "userId": 123,
            "username": "alice"
        }, {
            "_id": "010",
            "comment": "This is another comment",
            "userId": 123,
            "username": "alice"
        }, {
            "_id": "020",
            "comment": "This is one more comment",
            "userId": 123,
            "username": "alice"
        }];

        var api = {
            createCommentForUser: createCommentForUser,
            findAllCommentsForUser: findAllCommentsForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };

        return api;

        function createCommentForUser(userId, newComment,username, callback) {
            var comment = {};
            comment._id = (new Date).getTime();
            comment.userId = userId;
            comment.comment = newComment;
            comment.username = username;
            comments.push(comment);
            callback(comment);
        }

        function findAllCommentsForUser(userId, callback) {
            var commentsForUser = [];
            for (var i = 0; i < comments.length; i++) {
                if (comments[i].userId === userId) {
                    commentsForUser.push(comments[i]);
                }
            }
            callback(commentsForUser);
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