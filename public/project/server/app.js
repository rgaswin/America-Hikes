module.exports = function (app, db, mongoose) {
    // Initializing the User Model Instance.
    var userModel = require('./models/user.model.server.js')(db, mongoose);
    var trailModel = require('./models/trail.model.server.js')(db, mongoose);

    // Intializing the User Service Instance.
    var userService = require("./services/user.service.server.js")(app, userModel, trailModel);
    var trailService = require("./services/trail.service.server.js")(app, trailModel, userModel);
}

