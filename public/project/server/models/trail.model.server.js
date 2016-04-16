/**
 * Created by gopal on 3/25/2016.
 */

var q = require("q");

module.exports = function (db, mongoose) {

    var trailSchema = require("./trail.schema.server.js")(mongoose);
    var trailModel = mongoose.model('trails', trailSchema);
    var trails = [];

    var api = {
        findtrailByID: findtrailByID,
        createTrail: createTrail,
        getAllTrailNamesForUser: getAllTrailNamesForUser,
        userLikesTrail: userLikesTrail,
        postTrailComment: postTrailComment
    };
    return api;

    function findtrailByID(trailId) {
        var deferred = q.defer();
        // find one retrieves one document
        trailModel.findOne(
            // first argument is predicate
            {
                trailId: trailId
            },

            // doc is unique instance matches predicate
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createTrail(trail) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        trailModel.create(trail, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function getAllTrailNamesForUser(trailId) {
        var deffered = q.defer();
        trailModel.find({trailId: trailId}, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(doc);
            }
        });
        return deffered.promise;
    }

    function userLikesTrail(userId, trail) {
        var deferred = q.defer();
        var newTrail;
        // find the movie by imdb ID
        trailModel.findOne({trailId: trail.unique_id},
            function (err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }
                // if there's a trail
                if (doc) {
                    // add user to likes
                    doc.likes.push(userId);
                    // save changes
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no trail
                    // create a new instance
                    newTrail = new trailModel({
                        trailId: trail.unique_id,
                        city: trail.city,
                        lat: trail.lat,
                        lon: trail.lon,
                        likes: []
                    });
                    // add user to likes
                    newTrail.likes.push(userId);
                    // save new instance
                    newTrail.save(function (err, doc) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function postTrailComment(trailId, comment) {
        var deferred = q.defer();
        trailModel.findOne({trailId: trailId},
            function (err, doc) {
                if (err) {
                    // reject the promise;
                    deffered.reject(err);
                }
                else {
                    if (!doc.comments) {
                        doc.comments = [];
                    }
                    doc.comments.push({
                        id: comment.id,
                        comment: comment.comment,
                        username: comment.username,
                        postedon: comment.postedon
                    });
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function updateTrailComment(trailId, comment) {
        //var deferred = q.defer();
        //trailModel.update({trailId: trailId},
        //    {
        //
        //    }, function (err, doc) {
        //        if (err) {
        //            // reject promise if error
        //            deferred.reject(err);
        //        } else {
        //            // resolve promise
        //            UserModel.findById({_id: userId}, function (err, doc) {
        //                if (err) {
        //                    deferred.reject(err);
        //                }
        //                else {
        //                    deferred.resolve(doc);
        //                }
        //            });
        //        }
        //    });
        //return deferred.promise;
    }

}
