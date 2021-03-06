/**
 * Created by gopal on 2/18/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            register: register,
            logoutUser: logoutUser
        };

        return api;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/username/" + username);
        }

        function findUserByCredentials(user) {
            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.loggedInUser = user;
            return $rootScope.loggedInUser;
        }

        function logoutUser() {
            return $http.post("/api/assignment/logout");
        }
    }
})();