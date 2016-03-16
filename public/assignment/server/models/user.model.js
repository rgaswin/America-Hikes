/**
 * Created by gopal on 3/16/2016.
 */

// load mock data into users
var users = require("./user.mock.json");

module.exports = function () {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findUserByUsername(username){
        var user = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var loggedInUser = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === credentials.username && users[i].password === credentials.password) {
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
            if (users[i].id === userId) {
                users[i].name = newuser.name;
                users[i].firstName = newuser.firstName;
                users[i].lastName = newuser.lastName;
                users[i].username = newuser.username;
                users[i].password = newuser.password;
                user[i].roles = newuser.roles;
                return users[i];
            }
        }
    }
}
