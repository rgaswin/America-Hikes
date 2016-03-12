/**
 * Created by gopal on 2/15/2016.
 */
(function() {
    "use strict";
    angular
        .module("HikerApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        FormService.findAllFormsForUser($rootScope.loggedInUser._id, function(data) {
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
                title: $scope.formtitle
            };

            FormService.createFormForUser($rootScope.loggedInUser._id, newForm, function(form) {
                $scope.forms.push(form);
            });
        }

        function updateForm() {
            if (selectedFormIndex >= 0) {
                var userId = $scope.forms[selectedFormIndex].userId;
                var formId = $scope.forms[selectedFormIndex]._id;
                var newForm = {
                    _id: formId,
                    title: $scope.formtitle,
                    userId: userId
                };
                FormService.updateFormById(formId, newForm, function(response) {});
            }
        }

        var selectedFormIndex = -1; // Contains the Index of currently selected record

        function selectForm(index) {
            selectedFormIndex = index;
            $scope.formtitle = $scope.forms[selectedFormIndex].title;
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId, function() {
                $scope.forms.splice(index, 1);
            });
        }
    }
})();