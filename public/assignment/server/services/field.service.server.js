/**
 * Created by gopal on 3/16/2016.
 */

module.exports = function (app, model, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = model.findAllFieldsForForm(formId);
        res.json(fields);
    }

    function findFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldByFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = model.deleteFieldByFormId(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.findFieldByFormId(formId, field);
        res.json(fields);
    }

    function updateFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = model.updateFieldByFormId(formId, field);
        res.json(fields);
    }
}