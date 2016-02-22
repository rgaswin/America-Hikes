(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        FormService.findAllFormsForUser($rootScope.user._id, function (data) {
            $scope.forms = data;
        });

        console.log($scope.forms);

        // event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        // event handler implementation
        function addForm() {
            var newForm = {
                id: (new Date).getTime(),
                title: $scope.formtitle,
                userid: $rootScope.user._id
            };

            FormService.createFormForUser($rootScope.user._id, newForm, function (form) {
                console.log(form);
            });
        }

        function updateForm(movie) {
            if (selecteMovieIndex >= 0) {
                $scope.movies[selecteMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    director: movie.director
                }
            }
        }

        var selecteMovieIndex = -1;

        function selectForm(movie) {
            selecteMovieIndex = $scope.movies.indexOf(movie);
            console.log(movie);
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }

        function deleteForm(index) {
            console.log("deleteMovie: " + index);
            $scope.forms.splice(index, 1);
        }

    }
})();