/**
 * Created by gopal on 2/18/2016.
 */
(function() {
    "use strict";
    angular
        .module("HikerApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = []; // A list of Users Initialized as empty initially
        users = [{
            "_id": 123,
            "firstName": "Alice",
            "lastName": "Wonderland",
            "username": "alice",
            "password": "alice",
            "roles": ["student"]
        }, {
            "_id": 234,
            "firstName": "Bob",
            "lastName": "Hope",
            "username": "bob",
            "password": "bob",
            "roles": ["admin"]
        }, {
            "_id": 345,
            "firstName": "Charlie",
            "lastName": "Brown",
            "username": "charlie",
            "password": "charlie",
            "roles": ["faculty"]
        }, {
            "_id": 456,
            "firstName": "Dan",
            "lastName": "Craig",
            "username": "dan",
            "password": "dan",
            "roles": ["faculty", "admin"]
        }, {
            "_id": 567,
            "firstName": "Edward",
            "lastName": "Norton",
            "username": "ed",
            "password": "ed",
            "roles": ["student"]
        }];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var loggedInUser = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    loggedInUser = users[i];
                    break;
                }
            }
            callback(loggedInUser);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, newuser, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    users[i].name = newuser.name;
                    users[i].firstName = newuser.firstName;
                    users[i].lastName = newuser.lastName;
                    users[i].username = newuser.username;
                    users[i].password = newuser.password;
                    user[i].roles = newuser.roles;
                    callback(users[i]);
                }
            }
        }
    }
})();