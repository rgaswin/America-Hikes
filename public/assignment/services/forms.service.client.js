/**
 * Created by gopal on 2/18/2016.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];

        var formapi = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return formapi;

        function createFormForUser(userId, form, callback) {
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsForUser = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId === userId) {
                    formsForUser.push(forms[i]);
                }
            }
            console.log(formsForUser);
            callback(formsForUser);
        }

        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id === formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id === formId) {
                    forms[i]._id = newForm._id;
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;
                    callback(forms[i]);
                }
            }

        }
    }
})();