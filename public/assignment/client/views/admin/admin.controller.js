/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($http, UserService) {

        var vm = this;

        // Init function
        function init() {
            UserService.findAllUsers().then(
                function (response) {
                    for (var user in response.data) {
                        response.data[user].roles = response.data[user].roles.toString();
                    }
                    vm.users = response.data;
                }
            );
        }

        init();

        // Event Handler Declarations
        vm.add = addUser;
        vm.remove = remove;
        vm.select = select;
        vm.update = update;

        // Initialize table sort properties
        vm.orderByField = 'firstName';
        vm.reverseSort = false;

        // Event Handler Implementation

        function addUser(user) {
            UserService.createUser(user).then(
                function (response) {
                    for (var user in response.data) {
                        response.data[user].roles = response.data[user].roles.toString();
                    }
                    vm.users = response.data;
                },
                function (error) {
                    console.log(user);
                }
            );
        }

        var selectedUserIndex = -1;

        function select(index) {
            var newuser = {
                username: vm.users[index].username,
                firstName: vm.users[index].firstName,
                lastName: vm.users[index].lastName,
                email: vm.users[index].email,
                roles: vm.users[index].roles
            };

            vm.user = newuser;
            vm.user.username = newuser.username;
            vm.user.firstName = newuser.firstName;
            vm.user.lastName = newuser.lastName;
            vm.user.email = newuser.email;
            vm.user.roles = newuser.roles;
            selectedUserIndex = index;
        }

        function update() {
            var updatedUser = vm.users[selectedUserIndex];
            var updatedRole = vm.user.roles.split(',');
            updatedUser.username = vm.user.username;
            updatedUser.firstName = vm.user.firstName;
            updatedUser.lastName = vm.user.lastName;
            updatedUser.email = vm.user.email;
            updatedUser.roles = updatedRole;
            UserService.updateUser(updatedUser._id, updatedUser).then(
                function (response) {
                    response.data.roles = response.data.roles.toString();
                    vm.users[selectedUserIndex] = response.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        }

        function remove(index) {
            var userId = vm.users[index]._id;
            UserService.deleteUserById(userId).then(
                function (response) {
                    vm.users = response.data;
                },
                function (error) {
                    console.log(error);
                }
            )
        }
    }
})();