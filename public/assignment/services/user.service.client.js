/**
 * Created by gopal on 2/18/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var api = {

            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByUsernameAndPassword(username, password, callback)
        {
            var parsedJSONData = JSON.parse(users);
            for (var i=0;i<parsedJSONData.length;i++) {
                if(parsedJSONData[i].username == username && parsedJSONData[i].password == password)
                    callback(parsedJSONData[i]);

                else
                return callback(null);
            }
        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user, callback)
        {
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback)
        {
            for(var i=0;i<users.length;i++)
            {
                if(users[i].id == userid)
                {
                    users.splice(i,1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback)
        {
            for(var i=0; i<users.length;i++)
            {
                if(users[i].id == userid)
                {
                    users[i].name = user.name;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].password = user.password;
                    user[i].roles = user.roles;
                    callback(user[i]);
                }
            }


        }
    }
})();