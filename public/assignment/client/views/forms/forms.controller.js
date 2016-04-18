/**
 * Created by gopal on 2/15/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var vm = this;
        FormService.findAllFormsForUser($rootScope.loggedInUser._id).then(function (response) {
            vm.forms = response.data;
        });

        // viewuser handler declarations
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        // viewuser handler implementation
        function addForm() {
            var newForm = {
                title: vm.formtitle
            };

            console.log(newForm);

            FormService.createFormForUser($rootScope.loggedInUser._id, newForm).then(function (response) {
                console.log(response.data);
                vm.forms = response.data;
            });
        }

        function updateForm() {
            if (selectedFormIndex >= 0) {
                var userId = vm.forms[selectedFormIndex].userId;
                var formId = vm.forms[selectedFormIndex]._id;
                var newForm = {
                    _id: formId,
                    title: vm.formtitle,
                    userId: userId
                };
                FormService.updateFormById(formId, newForm).then(function (response) {
                    vm.forms = response.data;
                });
            }
        }

        var selectedFormIndex = -1; // Contains the Index of currently selected record

        function selectForm(index) {
            selectedFormIndex = index;
            vm.formtitle = vm.forms[selectedFormIndex].title;
        }

        function deleteForm(index) {
            var formId = vm.forms[index]._id;
            FormService.deleteFormById(formId).then(function (response) {
                vm.forms = response.data;
            });
        }
    }
})();