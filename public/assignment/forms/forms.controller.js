(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        FormService.findAllFormsForUser($rootScope.loggedInUser._id, function (data) {
            $scope.forms = data;
        });

        // event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        // event handler implementation
        function addForm() {
            var newForm = {
                _id: (new Date).getTime(),
                title: $scope.formtitle,
                userId: $rootScope.loggedInUser._id
            };

            FormService.createFormForUser($rootScope.loggedInUser._id, newForm, function (form) {
                FormService.findAllFormsForUser($rootScope.loggedInUser._id, function (data) {
                    $scope.forms = data;
                });
            });
        }

        function updateForm() {
            if (selectedFormIndex >= 0) {
                var userId = $scope.forms[selectedFormIndex].userId;
                var formid = $scope.forms[selectedFormIndex]._id;
                var newform = {
                    _id: formid,
                    title: $scope.formtitle,
                    userId: userId
                };

                FormService.updateFormById(formid, newform, function () {
                    FormService.findAllFormsForUser($rootScope.loggedInUser._id, function (data) {
                        $scope.forms = data;
                    });
                });
            }
        }

        var selectedFormIndex = -1;

        function selectForm(index) {
            selectedFormIndex = index;
            var formid = $scope.forms[selectedFormIndex]._id;
            $scope.formtitle = $scope.forms[selectedFormIndex].title;
        }

        function deleteForm(index) {
            var formid = $scope.forms[index]._id;
            FormService.deleteFormById(formid, function () {
                FormService.findAllFormsForUser($rootScope.loggedInUser._id, function (data) {
                    $scope.forms = data;
                });
            });
            $scope.forms.splice(index, 1);
        }
    }
})();