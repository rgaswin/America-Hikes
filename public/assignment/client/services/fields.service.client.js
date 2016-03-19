/**
 * Created by gopal on 3/18/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FormService);

    function FormService($http) {
        var api = {
            findFieldsForForm: findFieldsForForm,
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }

        return api;

        function findFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field)
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
        }

        function updateField(ormId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId);
        }
    }
})();
