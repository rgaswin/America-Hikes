/**
 * Created by gopal on 4/14/2016.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        aboutme:String,
        dob: Date,
        yrsOfTrekExp : String,
        roles: [String],
        likes: [String],
        images: [String],
        following:[String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'hikeruser'});
    return UserSchema;
};