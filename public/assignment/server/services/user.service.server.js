/**
 * Created by gopal on 3/16/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, model, db) {

    //var auth = authorized;
    //
    //app.get("/api/assignment/loggedin", loggedIn);
    //app.get("/api/assignment/user", auth, findAllUsers);
    //app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user/username/:username", findUserByUsername);
    //app.post("/api/assignment/login", passport.authenticate('local'), login);
    //app.post("/api/assignment/user", auth, createUser);
    //app.post("/api/assignment/register", register);
    //app.post("/api/assignment/logout", logout);
    //app.put("/api/assignment/user/:id", auth, updateUser);
    //app.delete("/api/assignment/user/:id", auth, deleteUserById);
    //
    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //
    //function localStrategy(username, password, done) {
    //    model
    //        .findUserByUsername(username)
    //        .then(
    //            function (user) {
    //                // if the user exists, compare passwords with bcrypt.compareSync
    //                if (user && bcrypt.compareSync(password, user.password)) {
    //                    return done(null, user);
    //                } else {
    //                    return done(null, false);
    //                }
    //            },
    //            function (err) {
    //                if (err) {
    //                    return done(err);
    //                }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done) {
    //    delete user.password;
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done) {
    //    model.findUserById(user._id).then(function (user) {
    //            delete user.password;
    //            done(null, user);
    //        },
    //        function (err) {
    //            done(err, null);
    //        }
    //    );
    //}
    //
    //function loggedIn(req, res) {
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //}
    //
    //function findAllUsers(req, res) {
    //    model.findAllUsers()
    //        .then(
    //            // return all users if promise resolved
    //            function (doc) {
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //function findUserById(req, res) {
    //    var userId = req.params.id;
    //    var user = model.findUserById(userId)
    //        .then(
    //            // return user if promise resolved
    //            function (doc) {
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //function findUserByUsername(req, res) {
    //    var username = req.params.username;
    //    var userResponse = model.findUserByUsername(username).then(
    //        // return user if promise resolved
    //        function (doc) {
    //            res.json(doc);
    //        },
    //        function (err) {
    //            res.json(err);
    //        }
    //    );
    //}
    //
    //function login(req, res) {
    //    var user = req.user;
    //    delete user.password;
    //    res.json(user);
    //}
    //
    //function register(req, res) {
    //    var newUser = req.body;
    //    newUser.roles = ["student"];
    //
    //    model.findUserByUsername(newUser.username).then(
    //        function (user) {
    //            if (user) {
    //                res.json(null);
    //            } else {
    //                newUser.password = bcrypt.hashSync(newUser.password);
    //                return model.createUser(newUser);
    //            }
    //        },
    //        function (err) {
    //            res.status(400).send(err);
    //        }).then(
    //        function (user) {
    //            if (user) {
    //                req.login(user, function (err) {
    //                    if (err) {
    //                        res.status(400).send(err);
    //                    } else {
    //                        res.json(user);
    //                    }
    //                });
    //            }
    //        },
    //        function (err) {
    //            res.status(400).send(err);
    //        }
    //    );
    //}
    //
    //function logout(req, res) {
    //    req.logOut();
    //    res.send(200);
    //}
    //
    //function createUser(req, res) {
    //    var newUser = req.body;
    //    if (newUser.roles && newUser.roles.length > 1) {
    //        newUser.roles = newUser.roles.split(",");
    //    } else {
    //        newUser.roles = ["student"];
    //    }
    //
    //    // first check if a user already exists with the username
    //    model
    //        .findUserByUsername(newUser.username)
    //        .then(
    //            function (user) {
    //                // if the user does not already exist
    //                if (user == null) {
    //                    // create a new user
    //                    return model.createUser(newUser)
    //                        .then(
    //                            // fetch all the users
    //                            function () {
    //                                return model.findAllUsers();
    //                            },
    //                            function (err) {
    //                                res.status(400).send(err);
    //                            }
    //                        );
    //                    // if the user already exists, then just fetch all the users
    //                } else {
    //                    return model.findAllUsers();
    //                }
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function (users) {
    //                res.json(users);
    //            },
    //            function () {
    //                res.status(400).send(err);
    //            }
    //        )
    //}
    //
    //
    //function updateUser(req, res) {
    //    var userId = req.params.id;
    //    var user = req.body;
    //    model.updateUser(userId, user).then(
    //        // return user if promise resolved
    //        function (doc) {
    //            res.json(doc);
    //        },
    //        function (err) {
    //            res.json(err);
    //        }
    //    );
    //}
    //
    //function deleteUserById(req, res) {
    //    var userId = req.params.id;
    //    model.deleteUserById(userId).then(
    //        // return user if promise resolved
    //        function (doc) {
    //            res.json(doc);
    //        },
    //        function (err) {
    //            res.json(err);
    //        }
    //    );
    //}
    //
    //function authorized(req, res, next) {
    //    if (!req.isAuthenticated()) {
    //        res.send(401);
    //    } else {
    //        next();
    //    }
    //};
}