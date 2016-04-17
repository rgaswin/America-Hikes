var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel, trailModel) {
    var multer = require('multer');
    var upload = multer({dest: __dirname + '../../../../uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    var auth = authorized;

    app.get("/api/project/loggedin", loggedIn);
    app.get("/api/project/user", auth, findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/username/:username", findUserByUsername);
    app.get("/api/project/user/username/:username/password/:password", findUserByCredentials);
    app.get("/api/project/user/:userId/trails", TrailsForUser);
    app.post("/api/project/user", auth, createUser);
    app.post("/api/project/register", register);
    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post("/api/project/user/:userId/trail/:trailId", userLikesTrail);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUserById);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(function (user) {
                delete user.password;
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

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
                    newUser.password = bcrypt.hashSync(newUser.password);
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

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
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

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function uploadImage(req, res) {

        var username = req.user.username;
        //var applicationId = req.body.applicationId;
        //var pageId = req.body.pageId;
        //var widgetId = req.body.widgetId;
        //var width = req.body.width;
        var myFile = req.file;
        var destination = myFile.destination;
        var path = myFile.path;
        var originalname = myFile.originalname;
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        var filename = myFile.filename;


        userModel.findUserByUsername(username).then(
            function (user) {
                if (!user.images) {
                    user.images = [];
                }
                user.images.push("/uploads/" + filename);//originalname;
                return user.save();
            },
            function (err) {
                res.status(400).send(err);
            }
            )
            .then(
                function () {
                    res.redirect("/project/client/index.html#/profile");
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}