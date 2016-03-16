/**
 * Created by gopal on 3/16/2016.
 */
module.exports = function (app, model, db) {

    app.post("/api/assignment/user/", createUser);
    app.get("/api/assignment/user/", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var userResponse = model.createUser(user);
        res.json(userResponse);
    }

    function findAllUsers(req, res) {
        var userResponse = model.findAllUsers()
        res.json(userResponse);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var userResponse = model.findUserById(userid);
        res.json(userResponse);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var userResponse = model.updateUser(userId, user);
        res.json(userResponse);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var userResponse = model.deleteUserById(userId);
        res.json(userResponse);
    }
}