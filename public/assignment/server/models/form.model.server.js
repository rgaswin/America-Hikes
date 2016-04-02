/**
 * Created by gopal on 3/16/2016.
 */

// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    // create user model from schema
    var FormModel = mongoose.model('form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findAllFieldsForForm: findAllFieldsForForm,
        findFormById: findFormById,
        findFieldByFormId: findFieldByFormId,
        deleteFieldByFormId: deleteFieldByFormId,
        createFieldForForm: createFieldForForm,
        updateFieldByFormId: updateFieldByFormId
    };

    return api;

    function createFormForUser(userId, newForm) {
        newForm.userId = userId;
        var deffered = q.defer();
        FormModel.create(newForm, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                FormModel.find({userId: userId}, function (err, doc) {
                    if (err) {
                        deffered.reject(err);
                    }
                    else {
                        deffered.resolve(doc);
                    }
                });
            }
        });
        return deffered.promise;
    }

    function findAllFormsForUser(userId) {
        var deffered = q.defer();
        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(doc);
            }
        });
        return deffered.promise;
    }

    function deleteFormById(formId) {
        var deffered = q.defer();
        FormModel.findOneAndRemove({_id: formId}, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(doc);
            }
        });
        return deffered.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        FormModel.update({_id: formId},
            {
                title: newForm.title,
                updated: new Date()
            }, function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    FormModel.find({userId: newForm.userId}, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deffered = q.defer();
        FormModel.find({title: title}, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(doc);
            }
        });
        return deffered.promise;
    }

    function findFormById(Id) {
        var deffered = q.defer();
        FormModel.find({_id: Id}, function (err, doc) {
            if (err) {
                deffered.reject(err);
            }
            else {
                //createonsole.log(doc);
                deffered.resolve(doc);
            }
        });
        return deffered.promise;
    }

    function findAllFieldsForForm(formId) {
        findFormById(formId);
    }

    function deleteFieldByFormId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.update({_id: formId},
            {$pull: {fields: {_id: fieldId}}}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormModel.findById(formId, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();

        FormModel.update({_id: formId},
            {$push: {fields: field}}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormModel
                        .findById(formId, function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
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

    function updateFieldByFormId(formId, field) {
        var form = findFormById(formId);
        for (var i = 0; i < form.fields.length; i++) {
            if (parseInt(form.field[i]._id) === parseInt(field._id)) {
                form.field[i].label = field.label;
                form.field[i].type = field.type;
                form.field[i].placeholder = field.placeholder;
                form.field[i].options = field.options;
            }
        }
        return form.fields;
    }
}