/**
 * Created by gopal on 3/16/2016.
 */

module.exports = function (app,db,mongoose) {
    var userModel = require('./models/user.model.server.js')(db,mongoose);
    var formModel = require('./models/form.model.js')(db,mongoose);

    var userService = require("./services/user.service.server.js")(app,userModel,null);
    var formService = require("./services/form.service.server.js")(app,formModel,null);
    var fieldService = require("./services/field.service.server.js")(app,formModel,null);
}