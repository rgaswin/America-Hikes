/**
 * Created by gopal on 4/14/2016.
 */
module.exports = function (mongoose) {
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        trailId: String,
        name: String,
        lat: String,
        lon: String,
        city: String,
        likes: [String],
    }, {collection: 'trail'});
    return UserSchema;
};