module.exports = function (app) {
    // Initializing the User Model Instance.

    var userModel  = require('./models/user.model.js')();
    var trailModel = require('./models/trail.model.js')();

    // Intializing the User Service Instance.
    var userService  = require("./services/user.service.server.js")(app,userModel,trailModel);
    var trailService = require("./services/trail.service.server.js")(app,trailModel,userModel);
}

