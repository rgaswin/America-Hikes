(function () {
    "use strict";
    angular
        .module("HikerApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            register: register,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            userLikesTrail: userLikesTrail,
            TrailsForUser: TrailsForUser,
            getAllUsersForTrail: getAllUsersForTrail
        };

        return api;

        function findUserByUsername(username) {
            return $http.get("/api/project/user/username/" + username);
        }

        function findUserByCredentials(user) {
            return $http.post("/api/project/login",user);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function userLikesTrail(userId, trail) {
            return $http.post("/api/project/user/" + userId + "/trail/" + trail.unique_id, trail);
        }

        function TrailsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/trails/");
        }

        function getAllUsersForTrail(trailId) {
            return $http.get("/api/project/trail/" + trailId + "/users/");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function uploadImage() {

        }

        function setCurrentUser(user) {
            $rootScope.loggedInUser = user;
            return $rootScope.loggedInUser;
        }

        function logoutUser() {
            $rootScope.loggedInUser = null;
            return null;
        }
    }
})();