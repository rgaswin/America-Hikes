/**
 * Created by gopal on 3/16/2016.
 */

// load mock data into forms
var forms = require("./form.mock.json");


var api = {
    createFormForUser: createFormForUser,
    findAllFormsForUser: findAllFormsForUser,
    deleteFormById: deleteFormById,
    updateFormById: updateFormById,
    findFormByTitle: findFormByTitle
};

return api;

function createFormForUser(userId, newForm) {
    newForm._id = (new Date).getTime();
    newForm.userId = userId;
    forms.push(newForm);
    return newForm;
}

function findAllFormsForUser(userId) {
    var formsForUser = [];
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].userId === userId) {
            formsForUser.push(forms[i]);
        }
    }
    return formsForUser;
}

function deleteFormById(formId) {
    for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id === formId) {
            forms.splice(i, 1);
            break;
        }
    }
    return forms;
}

function updateFormById(formId, newForm) {
    for (var i = 0; i < forms.length; i++) {
        if (forms[i]._id === formId) {
            forms[i]._id = newForm._id;
            forms[i].title = newForm.title;
            forms[i].userId = newForm.userId;
            return forms[i];
            break;
        }
    }
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