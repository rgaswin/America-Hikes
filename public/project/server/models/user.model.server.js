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
        findUsersByIds: findUsersByIds
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
        UserModel.findOne({name: username}, function (err, doc) {
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
        UserModel.findById(userId, function (err, doc) {
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

    function userLikesTrail(userId, trailInfo) {
        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add trail id to user likes
                doc.likes.push(trailInfo.trailId);

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
}
