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
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/event", {
                templateUrl: "views/event/event.view.html",
                controller: "EventController"
            })
            .when("/forms", {
                templateUrl: "forms/forms.view.html",
                controller: "FormController"
            })
            .when("/fields", {
                templateUrl: "forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("/details/:id", {
                templateUrl: "views/project/project.view.html",
                controller: "SearchDetailsController"
            })
            .when("/search/:lat/:lon/:trailname/:city", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();