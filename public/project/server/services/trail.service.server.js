/**
 * Created by gopal on 3/25/2016.
 */
module.exports = function (app, trailModel, userModel) {

    app.post("/api/project/user/:userId/trail/:trailId", userLikesTrail);
    app.get("/api/project/trail/:trailId/users", UsersForTrail);
    app.get("/api/project/trail/:trailId/user", findUserLikes);


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

    function findUserLikes (req, res) {
        var trailId = req.params.trailId;
        var trail = null;
        trailModel
            .findtrailByID(trailId)
            .then (
                function (doc) {
                    trail = doc;
                    if (doc) {
                        return userModel.findUsersByIds(trail.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    movie.userLikes = users;
                    res.json(movie);
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


}