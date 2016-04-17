/**
 * Created by gopal on 3/25/2016.
 */
module.exports = function (app, trailModel, userModel) {

    app.get("/api/project/trail/:trailId/comment", findAllCommentsForTrail);
    app.get("/api/project/trail/:trailId/users", UsersForTrail);
    app.post("/api/project/user/:userId/trail/:trailId", userLikesTrail);
    app.post("/api/project/trail/:trailId/comment", createCommentForTrail);
    app.put("/api/project/trail/:trailId/comment", updateCommentForTrail);
    app.delete("/api/project/trail/:trailId/comment/:commentId", deleteCommentForTrail);

    function findAllCommentsForTrail(req, res) {
        var trailId = req.params.trailId;
        trailModel.findtrailByID(trailId).then(
            function (trail) {
                res.json(trail.comments);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function UsersForTrail(req, res) {
        var trailId = req.params.trailId;
        var trailNames = trailModel.getAllTrailNamesForUser(trailId);
        res.json(trailNames);
    }

    function userLikesTrail(req, res) {
        var trailInfo = req.body;
        var userId = req.params.userId;
        var trailId = req.params.trailId;

        trailModel
            .userLikesTrail(userId, trailInfo)
            // add user to movie likes
            .then(
                function (trail) {
                    return userModel.userLikesTrail(userId, trail);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createCommentForTrail(req, res) {
        var comment = req.body;
        var trailId = req.params.trailId;
        trailModel
            .postTrailComment(trailId, comment)
            // Send the Trail Back to the client after updating the trail
            .then(
                function (trail) {
                    res.json(trail.comments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCommentForTrail(req, res) {
        var comment = req.body;
        var trailId = req.params.trailId;
        trailModel
            .updateTrailComment(trailId, comment)
            // Send the Trail Back to the client after updating the trail
            .then(
                function (trail) {
                    res.json(trail.comments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCommentForTrail(req, res) {
        var commentId = req.params.commentId;
        var trailId = req.params.trailId;
        trailModel
            .deleteTrailComment(trailId, commentId)
            // Send the Trail Back to the client after updating the trail
            .then(
                function (trail) {
                    res.json(trail.comments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}