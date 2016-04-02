/**
 * Created by gopal on 3/16/2016.
 */
module.exports = function (app, formModel, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormId);

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc[0].fields);
                },
                function (err) {
                    res.status(400).json(err);
                }
            )
    }

    function findFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldByFormId(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;

        formModel
            .createFieldForForm(formId, field)
            .then(
                function (doc) {
                    console.log(doc.fields);
                    res.json(doc.fields);
                },
                function (err) {
                    res.status(400).json(err);
                }
            );
    }

    function updateFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = formModel.updateFieldByFormId(formId, field);

    }
};