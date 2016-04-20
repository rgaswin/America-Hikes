/**
 * Created by gopal on 2/29/2016.
 */
(function () {
    angular
        .module("HikerApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/home/:searchType", {
                templateUrl: "views/home/home.view.html",
                controller: "SearchType",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs:"admin",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/viewuser/:userName", {
                templateUrl: "views/viewuser/viewuser.html",
                controller: "ViewUserController",
                controllerAs:"model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/details/:id", {
                templateUrl: "views/project/project.view.html",
                controller: "SearchDetailsController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/search/:trailId/:trailname/:lat/:lon", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                if(user.roles.indexOf('admin') != -1)
                { $rootScope.loggedInUser = user;
                    deferred.resolve();}
                else{
                    deferred.reject();
                    $location.url("/home");
                }
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.loggedInUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.loggedInUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();