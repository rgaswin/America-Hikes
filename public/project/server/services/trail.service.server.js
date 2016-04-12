/**
 * Created by gopal on 3/25/2016.
 */
module.exports = function (app, trailModel, userModel) {

    app.post("/api/project/user/:userId/trail/:trailId", userLikesTrail);
    app.get("/api/project/user/:userId/trails", TrailsForUser);
    app.get("/api/project/trail/photos", FewTrailPhotos);

    function userLikesTrail(req, res) {
        var trailInfo = req.body;
        var userId = req.params.userId;
        var trailId = req.params.trailId;
        var trail = trailModel.findtrailByID(trailId);
        if (!trail) {
            trail = trailModel.createTrail(trailInfo);
        }
        if (!trail.likes) {
            trail.likes = [];
        }

        var userexists = false;
        for (var t in trail.likes) {
            if (trail.likes[t] == userId)
                userexists = true;
        }
        if (!userexists) {
            trail.likes.push(userId);
        }

        var user = userModel.findUserById(userId);
        var trailexists = false;
        for (var u in user.likes) {
            if (user.likes[u] == trailId)
                trailexists = true;
        }

        if (!user.likes) {
            user.likes = [];
        }
        if (!trailexists) {
            user.likes.push(trailId);
        }
        res.send(200);
    }

    function TrailsForUser(req, res) {
        var userId = req.params.userId;
        var trailNames = trailModel.getAllTrailNamesForUser(userId);
        res.json(trailNames);
    }

    function FewTrailPhotos(req,res){

        var Flickr = require("flickrapi"),
            flickrOptions = {
                api_key: "API key that you get from Flickr",
                secret: "API key secret that you get from Flickr"
            };

        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            // we can now use "flickr" as our API object,
            // but we can only call public methods and access public data
        });
    }
}