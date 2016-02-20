/**
 * Created by gopal on 2/17/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html",
                    controller: "homecontroller"
                }
            )
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                }
            )
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                }
            )
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                }
            )
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "admincontroller"
                }
            )
            .when("/forms",
                {
                    templateUrl: "views/admin/forms/forms.view.html",
                    controller: "formscontroller"
                }
            )
            .when("/fields",
                {
                    templateUrl: "views/admin/forms/fields.view.html",
                    controller: "fieldscontroller"
                }
            )
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();