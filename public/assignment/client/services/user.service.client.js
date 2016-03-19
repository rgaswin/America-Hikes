/**
 * Created by gopal on 2/18/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser
        };

        return api;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/username/" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user/username/" + username + "/password/" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser(user){
            $rootScope.loggedInUser = user;
            return $rootScope.loggedInUser;
        }

        function logoutUser(){
            $rootScope.loggedInUser = null;
            return null;
        }
    }
})();