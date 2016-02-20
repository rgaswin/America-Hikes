(function()
    {
        angular
            .module("FormBuilderApp")
            .controller("LoginController",LoginController);

        function LoginController($scope,$location,$rootScope,UserService)
        {
            $scope.login = login;

            function login()
            {
                var username = $scope.username;
                var password = $scope.password;
                UserService.findUserByUsernameAndPassword(username,password,function(user)
                {
                    $rootScope.user = user;
                    $location.url("/profile");
                    console.log(user);
                });
            }
        }
    }
)();