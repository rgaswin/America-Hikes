module.exports = function (app, userModel, trailModel) {

    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/username/:username", findUserByUsername);
    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/user/:userId/trails", TrailsForUser);
    app.post("/api/project/user", createUser);
    app.post("/api/project/register", register);
    app.post("/api/project/user/:userId/trail/:trailId", userLikesTrail);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel.findUserByUsername(newUser.username).then(
            function (user) {
                if (user) {
                    res.json(null);
                } else {
                    return userModel.createUser(newUser);
                }
            },
            function (err) {
                res.status(400).send(err);
            }).then(
            function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUser(userId, user).then(
            // return user if promise resolved
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err);
            }
        );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId).then(
            // return user if promise resolved
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err);
            }
        );
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                // return all users if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var userResponse = userModel.findUserByUsername(username).then(
            // return user if promise resolved
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err);
            }
        );
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function TrailsForUser(req, res) {
        var userId = req.params.userId;
        var user = userModel.getAllTrailsForUser(userId);
        res.json(user.likes);
    }

    function userLikesTrail(req, res) {
        var trailInfo = req.body;
        var userId = req.params.userId;
        var trailId = req.params.trailId;
        var movie;

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
}