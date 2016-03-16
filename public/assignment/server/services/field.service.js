/**
 * Created by gopal on 3/16/2016.
 */

module.exports = function (app, module, db) {

    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);


    function findAllFieldsForForm(req, res) {
    }

    function findFieldByFormId(req, res) {
    }

    function deleteFieldByFormId(req, res) {
    }

    function createFieldForForm(req, res) {
    }

    function updateFieldByFormId(req, res) {
    }
}