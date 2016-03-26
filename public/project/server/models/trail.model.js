/**
 * Created by gopal on 3/25/2016.
 */

module.exports = function () {
    var trails = [];

    var api = {
        findtrailByID: findtrailByID,
        createTrail: createTrail,
        getAllTrailNamesForUser:getAllTrailNamesForUser
    };
    return api;

    function findtrailByID(trailId) {
        for (var t in trails) {
            if (trails[t].trailId == trailId) {
                return trails[t];
            }
        }
        return null;
    }

    function createTrail(trail) {
        trail = {
            trailId: trail.unique_id,
            name: trail.name,
            lat: trail.lat,
            lon: trail.lon,
            city: trail.city
        };
        trails.push(trail);
        return trail;
    }

    function getAllTrailNamesForUser(userId)
    {
        var trailNames = [];
        for(var t in trails)
        {
            for(var u in trails[t].likes)
            {
                if(trails[t].likes[u] == userId)
                trailNames.push(trails[t].name);
            }
        }
        return trailNames;
    }



}



