module.exports = function (app) {
    // Initializing the User Model Instance.
    var userModel = require('./models/user.model.js')();

    // Intializing the User Service Instance.
    var userService = require("./services/user.service.server.js")(app,userModel,null);

}

