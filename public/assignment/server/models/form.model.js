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
        findFormByTitle: findFormByTitle
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
            if (forms[i].title === Id) {
                form = forms[i];
            }
        }
        return form;
    }
}