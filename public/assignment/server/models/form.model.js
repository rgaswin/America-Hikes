/**
 * Created by gopal on 3/16/2016.
 */


// load mock data into forms
var forms = require("./form.mock.json");

module.exports = function () {

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFormId: findFieldByFormId,
        deleteFieldByFormId: deleteFieldByFormId,
        createFieldForForm: createFieldForForm,
        updateFieldByFormId: updateFieldByFormId
    };

    return api;

    function createFormForUser(userId, newForm) {
        newForm._id = (new Date).getTime();
        newForm.userId = userId;
        forms.push(newForm);
        return findAllFormsForUser(userId);
    }

    function findAllFormsForUser(userId) {
        var formsForUser = [];
        userId = parseInt(userId);
        for (var i = 0; i < forms.length; i++) {
            if (parseInt(forms[i].userId) === userId) {
                formsForUser.push(forms[i]);
            }
        }
        return formsForUser;
    }

    function deleteFormById(formId) {
        var userId = null;
        for (var i = 0; i < forms.length; i++) {
            if (parseInt(forms[i]._id) === parseInt(formId)) {
                userId = forms[i].userId;
                forms.splice(i, 1);
                break;
            }
        }
        return findAllFormsForUser(userId);
    }

    function updateFormById(formId, newForm) {
        for (var i = 0; i < forms.length; i++) {
            if (parseInt(forms[i]._id) === parseInt(formId)) {
                forms[i]._id = newForm._id;
                forms[i].title = newForm.title;
                forms[i].userId = newForm.userId;
                break;
            }
        }
        return findAllFormsForUser(newForm.userId);
    }

    function findFormByTitle(title) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title === title) {
                form = forms[i];
            }
        }
        return form;
    }

    function findFormById(Id) {
        var form = null;
        for (var i = 0; i < forms.length; i++) {
            if (parseInt(forms[i]._id) === parseInt(Id)) {
                form = forms[i];
                break;
            }
        }
        return form;
    }

    function findAllFieldsForForm(formId) {
        var form = findFormById(formId);
        return form.fields;
    }

    function findFieldByFormId(formId, fieldId) {
        var form = findFormById(formId);
        var field = null;
        for (var i = 0; i < form.fields.length; i++) {
            if (parseInt(form.fields[i]._id) === parseInt(fieldId)) {
                field = form.fields[i];
                break;
            }
        }
        return field;
    }

    function deleteFieldByFormId(formId, fieldId) {
        var form = findFormById(formId);
        var field = null;
        for (var i = 0; i < form.fields.length; i++) {
            if (parseInt(form.fields[i]._id) === parseInt(fieldId)) {
                field = form.fields[i];
                form.fields.splice(i, 1);
                break;
            }
        }
        return form.fields;
    }

    function createFieldForForm(formId, field) {
        var form = findFormById(formId);
        form.fields.push(field);
        return form.fields;
    }

    function updateFieldByFormId(formId, field) {
        var form = findFormById(formId);
        for (var i = 0; i < form.fields.length; i++) {
            if(parseInt(form.field[i]._id) === parseInt(field._id)){
                form.field[i].label = field.label;
                form.field[i].type = field.type;
                form.field[i].placeholder = field.placeholder;
                form.field[i].options = field.options;
            }
        }
        return form.fields;
    }
}