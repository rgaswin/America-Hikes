/**
 * Created by gopal on 3/16/2016.
 */
module.exports = function (app, model, db) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/username/:username", findUserByUsername);
    app.get("/api/assignment/user/username/:username/password/:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        user = model.createUser(user).then(
            // login user if promise resolved
            function (doc) {
                res.json(user);
            },
            // send error if promise rejected
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllUsers(req, res) {
        var users = model.findAllUsers()
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
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = model.findUserById(userId)
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

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        model.updateUser(userId, user).then(
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
        var userResponse = model.deleteUserById(userId).then(
            // return user if promise resolved
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.json(err);
            }
        );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var userResponse = model.findUserByUsername(username).then(
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
        var userResponse = model.findUserByCredentials(username, password).then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}