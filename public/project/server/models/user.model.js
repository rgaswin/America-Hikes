// load mock data into users
var users = require("./user.mock.json");

module.exports = function () {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        getAllUserNamesForTrail: getAllUserNamesForTrail
};

    return api;


    function findUserByCredentials(username, password) {
        var loggedInUser = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                loggedInUser = users[i];
                break;
            }
        }
        return loggedInUser;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        user._id = (new Date).getTime();
        users.push(user);
        return (user);
    }

    function deleteUserById(userId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }

    function updateUser(userId, newuser) {
        for (var i = 0; i < users.length; i++) {
            userId = parseInt(userId);
            if (users[i]._id === userId) {
                users[i].name = newuser.name;
                users[i].firstName = newuser.firstName;
                users[i].lastName = newuser.lastName;
                users[i].username = newuser.username;
                users[i].password = newuser.password;
                users[i].email = newuser.email;
                users[i].roles = newuser.roles;
                return users[i];
            }
        }
    }

    function findUserByUsername(username) {
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findUserById(id) {
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id === parseInt(id)) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function getAllUserNamesForTrail(trailId) {
        var userNames = [];
        for (var u in users) {
            for (var l in users[u].likes) {
                if (users[u].likes[l] == trailId)
                    userNames.push(users[u].firstName);
            }
        }
        return userNames;
    }
}




