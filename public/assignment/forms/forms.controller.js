/**
 * Created by gopal on 2/15/2016.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        FormService.findAllFormsForUser($rootScope.loggedInUser._id).then(function(response) {
            $scope.forms = response.data;
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

            FormService.createFormForUser($rootScope.loggedInUser._id, newForm).then(function(response) {
                console.log(response.data);
                $scope.forms = response.data;
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
                FormService.updateFormById(formId, newForm).then(function(response) {
                    $scope.forms = response.data;
                });
            }
        }

        var selectedFormIndex = -1; // Contains the Index of currently selected record

        function selectForm(index) {
            selectedFormIndex = index;
            $scope.formtitle = $scope.forms[selectedFormIndex].title;
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId).then(function(response) {
                $scope.forms = response.data;
            });
        }
    }
})();