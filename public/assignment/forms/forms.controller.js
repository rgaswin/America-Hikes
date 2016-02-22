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

        function updateForm() {
            if (selecteMovieIndex >= 0) {
                $scope.forms[selecteMovieIndex] = {
                   title: $scope.formtitle
                }
            }
        }

        var selecteMovieIndex = -1;

        function selectForm(index) {
            selecteMovieIndex = index;
            $scope.formtitle = $scope.forms[index].title;
        }

        function deleteForm(index) {
            $scope.forms.splice(index, 1);
        }
    }
})();