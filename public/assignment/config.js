/**
 * Created by gopal on 2/17/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "profile"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "register"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "form"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();