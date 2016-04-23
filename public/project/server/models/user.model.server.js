// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    // create user model from schema
    var UserModel = mongoose.model('Hikeruser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        getAllTrailsForUser: getAllTrailsForUser,
        userLikesTrail: userLikesTrail,
        findUsersByIds: findUsersByIds,
        followUser: followUser
    };

    return api;

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {
                username: username,
                password: password
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

    function findAllUsers() {
        var deffered = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                // reject promise if error
                deffered.reject(err);
            } else {
                // resolve promise
                deffered.resolve(doc);
            }
        });
        // return a promise
        return deffered.promise;
    }

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
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

    function deleteUserById(userId) {
        // use q to defer the response
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                UserModel.find(function (err, doc) {
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

    function updateUser(userId, newuser) {
        var deferred = q.defer();
        UserModel.update({_id: userId},
            {
                aboutme: newuser.aboutme,
                username: newuser.username,
                password: newuser.password,
                firstName: newuser.firstName,
                lastName: newuser.lastName,
                email: newuser.email,
                roles: newuser.roles
            }, function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    UserModel.findById({_id: userId}, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getAllTrailsForUser(userId) {
        var deferred = q.defer();
        UserModel.findOne({"_id": userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function userLikesTrail(userId, username, trailInfo) {
        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // Check if user already liked the trail
                var trailliked = false;
                if (doc.likes) {
                    for (var trail in doc.likes) {
                        if (doc.likes[trail].id == trailInfo.trailId) {
                            trailliked = true;
                            break;
                        }
                    }
                }
                if (!trailliked) {
                    // add trail to user
                    doc.likes.push({
                        id: trailInfo.trailId,
                        trailname: trailInfo.name,
                        lat: trailInfo.lat,
                        lon: trailInfo.lon
                    });
                }

                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findUsersByIds(userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function followUser(CurrentUser, OtherUser) {
        var deferred = q.defer();

        // find the user
        UserModel.findById(CurrentUser, function (err, doc) {
            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add User id to user Following
                if (doc.following.indexOf(OtherUser) < 0)
                    doc.following.push(OtherUser);

                // save user
                doc.save(function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {
                        // resolve promise with user
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
}
