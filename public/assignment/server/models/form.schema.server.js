/**
 * Created by gopal on 4/1/2016.
 */
/**
 * Created by gopal on 4/1/2016.
 */
module.exports = function (mongoose) {
    var Field = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: "New Form"},
        fields: [Field],
        created: {type: Date, default: new Date()},
        updated: {type: Date, default: new Date()}
    }, {collection: 'form'});
    return FormSchema;
};